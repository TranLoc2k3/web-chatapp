import { socket } from "@/configs/socket";
import { useEffect, useRef, useState } from "react";

import Peer from "simple-peer";
const Video = ({ peer }: { peer: any }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.on("stream", (stream: any) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return <video playsInline autoPlay ref={ref} />;
};

interface IProps {
  roomID: string;
}
const Room = ({ roomID }: IProps) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef(socket);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<any[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers: any = [];
          users.forEach((userID: string) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer] as any);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, [roomID]);

  function createPeer(userToSignal: any, callerID: any, stream: any) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal: any, callerID: any, stream: any) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute size-[20%] right-5 bottom-0 z-[9999]">
        <video
          ref={userVideo}
          className="size-full"
          autoPlay
          playsInline
          muted
        />
        {/* {!actionState.video && !actionState.shareScreen && (
          <Image
            src={user?.urlavatar}
            width={200}
            height={200}
            alt=""
            className="size-full absolute inset-0"
          />
        )} */}
      </div>
      <div className="flex flex-wrap gap-5">
        {peers.map((peer, index) => {
          return (
            <div key={index} className="basis-1/4">
              <Video peer={peer} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Room;
