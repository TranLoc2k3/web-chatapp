'use client';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import UserMarker from './UserMarker';

import { userAPI } from '@/api/userAPI';
import { axiosClient } from "@/configs/axios.config";

import { socket } from "@/configs/socket";

const MapboxComponent = () => {
    let marker: mapboxgl.Marker;
    let popup: mapboxgl.Popup;
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const session = useSession();
    const { toast } = useToast();
    const handleOnClickPopupUser = async () => {

        const userID = session.data?.token.user;
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            const res = await userAPI.updateUserLocation(userID, lng, lat);
            if (res?.status === 200) {
                toast({
                    title: "Thông báo",
                    description: "Cập nhật thành công!",
                    duration: 2000,
                });
            }
        });

        marker.togglePopup();
    }
    const handleOnClick = async () => {
        const idStranger = localStorage.getItem('idStranger');
        const dataStranger = await userAPI.getUserByPhone(`/user/get-user/${idStranger}`);
        if (idStranger === session.data?.token.user) {
            toast({
                title: "Thông báo",
                description: "Không thể kết bạn với chính mình!",
                duration: 2000,
            });
        }
        if (dataStranger?.message === 'User not found') {
            toast({
                title: "Thông báo",
                description: "Người dùng không tồn tại!",
                duration: 2000,
            });
        }
        else {
            const payload1 = {
                senderId: session.data?.token.user,
                receiverId: idStranger,
            };
            const payload2 = {
                senderId: idStranger,
                receiverId: session.data?.token.user,
            };

            const resRequest1 = await axiosClient.post(
                "friend-request/check-request-exists",
                payload1
            );
            const resRequest2 = await axiosClient.post(
                "friend-request/check-request-exists",
                payload2
            );
            if (resRequest1?.data.code === 2 || resRequest2?.data.code === 2) {
                toast({
                    title: "Thông báo",
                    description: "Người dùng tồn tại trong danh sách bạn bè!",
                    duration: 2000,
                });
            }
            else if (resRequest1?.data.code === 0 || resRequest2?.data.code === 0) {
                toast({
                    title: "Thông báo",
                    description: "Lời mời kết bạn đã được gửi trước đó!",
                    duration: 2000,
                });
            }
            else if (resRequest1?.data.code === 1 || resRequest2?.data.code === 1) {
                socket.emit("new friend request client", payload1);
                toast({
                    title: "Thông báo",
                    description: "Đã gửi lời mời kết bạn thành công!",
                    duration: 2000,
                });
            }
        }

        popup.remove();
    }

    // Lay tat cac cac vi tri của user tu database, app có thể lấy theo đoạn này
    let geojson = {
        "features": []
    };
    useEffect(() => {
        const fetchData = async () => {
            const dataUserLocation = await userAPI.getAllUserLocation();
            geojson.features = dataUserLocation?.data ?? [];
        };

        fetchData();
    }, []);



    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbmxvYzJrMyIsImEiOiJjbHZxYnR2bDYwYmppMmpwNnRnemlhaHA5In0.Fn9lSoYFUZ96simIJs9s4g'; // Thay thế bằng access token của bạn từ Mapbox
        navigator.geolocation.getCurrentPosition((position) => {
            if (mapContainer.current) {
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/tranloc2k3/clvqf282601r501qubbo47ruh',
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 16,
                    attributionControl: false,
                });


                const markerElement = document.createElement('div');
                ReactDOM.render(<UserMarker />, markerElement);
                // Create popup for user
                const popupEl = document.createElement('div');
                const button = document.createElement('button');
                button.textContent = 'Cập nhật vị trí';
                button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
                button.onclick = handleOnClickPopupUser;
                popupEl.appendChild(button);

                // Add popup user to mapbox
                if (popupEl.firstChild) {
                    marker = new mapboxgl.Marker(markerElement)
                        .setLngLat([position.coords.longitude, position.coords.latitude])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupEl.firstChild))
                        .addTo(map);
                }

                map.addControl(
                    new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl
                    })
                );
                // Add layer, custom marker, popup
                map.on('load', () => {
                    map.addSource('dataUserLocation', {
                        type: 'geojson',
                        data: geojson,
                        cluster: true,
                        clusterMaxZoom: 14,
                        clusterRadius: 50
                    });

                    map.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'dataUserLocation',
                        filter: ['has', 'point_count'],
                        paint: {
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                            ],
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });

                    map.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'dataUserLocation',
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': ['get', 'point_count_abbreviated'],
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        }
                    });
                    // App có thể dùng chung image này hoặc khác cũng dc
                    map.loadImage('https://cdn-icons-png.flaticon.com/512/9204/9204285.png', function (error, image) {
                        if (error) throw error;
                        map.addImage('my-marker', image);
                    });


                    map.addLayer({
                        id: 'unclustered-point',
                        type: 'symbol',
                        source: 'dataUserLocation',
                        filter: ['!', ['has', 'point_count']],
                        layout: {
                            'icon-image': 'my-marker',
                            'icon-size': 0.1
                        }
                    });

                    map.on('click', 'unclustered-point', async function (e) {
                        if (e.features) {
                            const coordinates = e.features[0].geometry.coordinates.slice();
                            const id = e.features[0]?.properties?.IDUser; // Get the ID from the properties
                            const dataUser = await userAPI.getUserByPhone(`/user/get-user/${id}`);

                            let fullname = dataUser?.fullname || 'Fake Name';
                            if (id === session.data?.token.user) fullname = 'Bạn';
                            let urlavatar = dataUser?.urlavatar;

                            const popupEl = document.createElement('div');
                            popupEl.className = 'flex items-center justify-center';

                            const infoUser = document.createElement('div');
                            infoUser.className = 'flex flex-col items-center justify-center mr-2';

                            const avatar = document.createElement('img');
                            if (!urlavatar) urlavatar = 'https://static.thenounproject.com/png/363640-200.png';
                            avatar.src = urlavatar;
                            avatar.className = 'w-10 h-10 rounded-full';

                            infoUser.appendChild(avatar);

                            const name = document.createElement('p');
                            name.textContent = fullname;
                            infoUser.appendChild(name);

                            popupEl.appendChild(infoUser);

                            if (id !== session.data?.token.user) {
                                const button = document.createElement('button');
                                button.textContent = 'Kết bạn';
                                button.onclick = handleOnClick;
                                button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
                                popupEl.appendChild(button);
                            }

                            localStorage.setItem('idStranger', id);
                            popup = new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setDOMContent(popupEl)
                                .addTo(map);
                        }
                    });
                });
                return () => map.remove();
            }
        });

    }, []);

    return (
        <div className='h-full'>
            <div ref={mapContainer} className='h-full mr-2' />
            <Toaster />
        </div>
    );
};


export default MapboxComponent;