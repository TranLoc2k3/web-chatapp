import { useEffect, useState } from 'react';
import { axiosClient } from "@/configs/axios.config";
import { userAPI } from "@/api/userAPI";

function PopupStranger({ IDStranger }: { IDStranger: string }) {
    const [userSender, setUserSender] = useState(null);
    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await userAPI.getUserByPhone(`user/get-user/84123123123`);
                if (user) {
                    setUserSender(user);
                } else {
                    console.log('User is null or undefined');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        }
        fetchUser();
    }, []);

    console.log('Rendering PopupStranger with userSender:', userSender);

    const handleTest = () => {

    };

    return <div className="flex">
        <div className="flex flex-col">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="w-12 h-12 rounded-full" />
            {/* <p>{userSender ? userSender.name : 'Loading...'}</p> */}
        </div>

        <button onClick={handleTest}>Kết bạn</button>
    </div>
}

export default PopupStranger;