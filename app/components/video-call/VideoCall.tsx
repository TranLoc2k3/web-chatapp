"use client";
import { useBearStore } from "@/app/global-state/store";
import { CallStatus, UserProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { socket } from "@/configs/socket";
import {
  Loader2,
  Mic,
  MicOff,
  PhoneMissed,
  ScreenShare,
  Video,
  VideoOff,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { userAPI } from "@/api/userAPI";

interface IProps {
  openCamera: boolean;
  userP: UserProps;
}

function VideoCall({ openCamera, userP }: IProps) {
  const { openChildModalConversationInfo, setOpenChildModalConversationInfo } =
    useBearStore((state) => ({
      openChildModalConversationInfo: state.openChildModalConversationInfo,
      setOpenChildModalConversationInfo:
        state.setOpenChildModalConversationInfo,
    }));
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [user, setUser] = useState<UserProps>(userP);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState<any>(null);
  const session = useSession();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef<any>();
  const [actionState, setActionState] = useState({
    video: openCamera,
    mic: true,
    shareScreen: false,
    peerVideo: true,
    peerMic: true,
    peerShareScreen: false,
  });

  const [stream, setStream] = useState<any>(null);
  const { toast } = useToast();

  const turnOffCamera = () => {
    if (localVideoRef.current) {
      const streamLocal = localVideoRef.current.srcObject as MediaStream;
      const tracks = streamLocal.getVideoTracks();
      if (tracks) {
        tracks.forEach((track: any) => {
          track.enabled = !track.enabled;
          let openCameraString = track.enabled ? "enabled" : "disabled";
          connectionRef?.current &&
            connectionRef.current.send(openCameraString);
          setActionState({ ...actionState, video: track.enabled });
        });
      }
    }
  };

  // Function to share the screen
  const shareScreen = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        setActionState({ ...actionState, shareScreen: true });
        localVideoRef.current.srcObject
          .getVideoTracks()[0]
          .addEventListener("ended", () => {
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then((localStream) => {
                {
                  if (localVideoRef.current) {
                    localVideoRef.current.srcObject = localStream;

                    connectionRef.current.streams[0].getVideoTracks()[0].stop();

                    connectionRef.current.replaceTrack(
                      connectionRef.current.streams[0].getVideoTracks()[0],
                      localStream.getVideoTracks()[0],
                      connectionRef.current.streams[0]
                    );
                  }
                }
              });
            setActionState({ ...actionState, shareScreen: false });
          });

        // console.log(connectionRef.current.streams[0]);

        connectionRef.current.streams[0].getVideoTracks()[0].stop();

        connectionRef.current.replaceTrack(
          connectionRef.current.streams[0].getVideoTracks()[0],
          mediaStream.getVideoTracks()[0],
          connectionRef.current.streams[0]
        );
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  // Function to turn off the microphone
  const turnOffMic = () => {
    if (localVideoRef.current) {
      let mediaStream: MediaStream = localVideoRef.current
        .srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
      if (tracks) {
        tracks.forEach((track) => {
          if (track.kind === "audio") {
            track.enabled = !track.enabled;
            setActionState({ ...actionState, mic: track.enabled });
          }
        });
      }
    }
  };

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal: any) => {
      data &&
        socket.emit("webRTC-signaling", {
          connectedUserSocketId: data.socketIDCallee,
          IDCaller: data.IDCaller,
          signalData: signal,
          socketIDCaller: data.socketIDCaller,
          peerUser: user,
        });
    });
    peer.on("stream", (stream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    socket.on("webRTC-signaling", (data) => {
      console.log("callAccepted", data);
      setCallAccepted(true);
      peer.signal(data.signalData);
    });
    peer.on("data", (data) => {
      const decoder = new TextDecoder();
      const str = decoder.decode(data);
      const openPeerVideo = str === "enabled" ? true : false;

      setActionState((pre) => ({
        ...pre,
        peerVideo: openPeerVideo,
      }));
    });
    peer.on("close", () => {
      if (connectionRef.current) {
        socket.off("webRTC-signaling");
        connectionRef.current.end();
      }
      setData(null);
      endedCall();
    });
    connectionRef.current = peer;
  };

  const answerCall = (dataCaller: any) => {
    // console.log("answer");
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    let openCameraString = actionState.video ? "enabled" : "disabled";

    peer.on("signal", (signal) => {
      dataCaller &&
        socket.emit("webRTC-signaling", {
          connectedUserSocketId: dataCaller.socketIDCaller,
          signalData: signal,
          peerUser: user,
          type: "answer",
        });
    });
    peer.on("stream", (stream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });
    peer.on("data", (data) => {
      const decoder = new TextDecoder();
      const str = decoder.decode(data);
      const openPeerVideo = str === "enabled" ? true : false;

      setActionState((pre) => ({
        ...pre,
        peerVideo: openPeerVideo,
      }));
    });
    peer.on("close", () => {
      if (connectionRef.current) {
        socket.off("webRTC-signaling");
        connectionRef.current.end();
      }
      setData(null);
      endedCall();
    });

    peer.signal(dataCaller.signalData);
    peer.write(openCameraString);
    connectionRef.current = peer;
  };
  const endedCall = async () => {
    if (callAccepted && connectionRef.current) {
      connectionRef.current.end();
    }
    setData(null);
    setOpenChildModalConversationInfo("videoCall", false);
    setCallAccepted(false);

    if (stream) {
      stream.getTracks().map((track: any) => {
        track.stop();
      });
    }

    if (localVideoRef.current?.srcObject) {
      const localStream = localVideoRef.current.srcObject as MediaStream;
      localStream.getTracks().map((track: any) => {
        track.stop();
      });
    }
  };

  useEffect(() => {
    openChildModalConversationInfo.videoCall &&
      !actionState.shareScreen &&
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((localStream) => {
          setStream(localStream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
          }
          if (!actionState.video) {
            turnOffCamera();
          }
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openChildModalConversationInfo]);

  useEffect(() => {
    const handleEventSocket = async (dataSocket: any) => {
      if (dataSocket.preOfferAnswer === CallStatus.CALL_REJECTED) {
        endedCall();
        return;
      }
      if (dataSocket.preOfferAnswer === CallStatus.CALL_ACCEPTED) {
        setData(dataSocket);
        return;
      }
      if (dataSocket.preOfferAnswer === CallStatus.CALL_UNAVAILABLE) {
        endedCall();
        return;
      }
      if (dataSocket.preOfferAnswer === CallStatus.CALLEE_NOT_FOUND) {
        setCallEnded(true);
        return;
      }
    };
    socket.on("pre-offer-single-answer", handleEventSocket);

    return () => {
      socket.off("pre-offer-single-answer", handleEventSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);

  useEffect(() => {
    const getUser = async () => {
      const user = await userAPI.getUserByPhone(
        `/user/get-user/${session.data?.token.user}`
      );
      setUser(user);
    };
    session.data?.token.user && getUser();
  }, [session]);

  useEffect(() => {
    let timer: any;
    if (callEnded && stream) {
      timer = setTimeout(() => {
        endedCall();
      }, 5000);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callEnded, stream]);

  useEffect(() => {
    socket.on("webRTC-signaling", (data) => {
      setData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    data?.signalData &&
      data.signalData.type === "offer" &&
      stream &&
      answerCall(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, stream]);
  useEffect(() => {
    if (!openChildModalConversationInfo.videoCall) return;

    if (stream && data?.IDCaller === session.data?.token.user) callUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openChildModalConversationInfo.videoCall, stream, data]);

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute size-[20%] right-5 bottom-0 z-[9999]">
        <video
          ref={localVideoRef}
          className="size-full"
          autoPlay
          playsInline
          muted
        />
        {!actionState.video && !actionState.shareScreen && (
          <Image
            src={user?.urlavatar}
            width={200}
            height={200}
            alt=""
            className="size-full absolute inset-0"
          />
        )}
      </div>
      {/* {actionState.peerVideo && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"></div>
        )} */}
      <div className="absolute size-full">
        {callAccepted ? (
          <video
            ref={remoteVideoRef}
            className="size-full"
            autoPlay
            playsInline
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full bg-gray-300 relative">
              <Image
                alt=""
                src="https://timonwa.com/_next/image?url=https%3A%2F%2Faffiliates.verpex.com%2Faccounts%2Fdefault1%2Fd5b6ou9gx%2Fda28815d.png&w=384&q=75"
                fill
                className="rounded-full"
              />
            </div>
            <p className="text-white flex justify-center items-center gap-3 mt-4">
              Đang kết nối ...
              <Loader2 className="animate-spin" />
            </p>
          </div>
        )}
        {!actionState.peerVideo && data?.peerUser && (
          <Image
            src={data.peerUser.urlavatar}
            width={200}
            height={200}
            alt=""
            className="size-full absolute inset-0 object-none"
          />
        )}
      </div>

      {
        <div className="absolute w-full bottom-5 left-0 flex justify-center gap-5">
          <Button
            onClick={turnOffCamera}
            className="size-[60px] rounded-full bg-green-600 flex justify-center items-center"
          >
            {actionState.video ? <Video /> : <VideoOff />}
          </Button>
          <Button
            onClick={turnOffMic}
            className="size-[60px] rounded-full bg-green-600 flex justify-center items-center"
          >
            {actionState.mic ? <Mic /> : <MicOff />}
          </Button>
          <Button
            onClick={shareScreen}
            className="size-[60px] rounded-full bg-green-600 flex justify-center items-center"
          >
            <ScreenShare />
          </Button>
          <Button
            onClick={endedCall}
            className="size-[60px] rounded-full bg-red-600 flex justify-center items-center"
          >
            <PhoneMissed />
          </Button>
        </div>
      }
    </div>
  );
}

export default VideoCall;
