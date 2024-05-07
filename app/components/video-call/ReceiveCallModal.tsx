"use client";
import { userAPI } from "@/api/userAPI";
import { useBearStore } from "@/app/global-state/store";
import { UserProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { socket } from "@/configs/socket";
import { PhoneMissed, Video, VideoOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProps {
  setOpenCamera: any;
  setUser: any;
}

function ReceiveCallModal({ setOpenCamera, setUser }: IProps) {
  const [data, setData] = useState<any>(null);
  const { openChildModalConversationInfo, setOpenChildModalConversationInfo } =
    useBearStore((state) => ({
      openChildModalConversationInfo: state.openChildModalConversationInfo,
      setOpenChildModalConversationInfo:
        state.setOpenChildModalConversationInfo,
    }));

  const onAcceptCall = (openCamera: boolean) => {
    if (data.callType === "single") {
      setOpenChildModalConversationInfo("videoCall", true);
    } else {
      setOpenChildModalConversationInfo("groupCall", true);
    }
    const payload = {
      ...data,
      preOfferAnswer: "CALL_ACCEPTED",
    };

    setUser(data.callee);
    setOpenCamera(openCamera);
    socket.emit("pre-offer-single-answer", payload);
    setOpenChildModalConversationInfo("receiveCall", false);
  };
  const onRejectCall = () => {
    const payload = {
      ...data,
      preOfferAnswer: "CALL_REJECTED",
    };

    socket.emit("pre-offer-single-answer", payload);
    setOpenChildModalConversationInfo("receiveCall", false);
  };
  useEffect(() => {
    socket.on("pre-offer-single", async (data) => {
      console.log("offer");

      const caller = await userAPI.getUserByPhone(
        `/user/get-user/${data.IDCaller}`
      );
      const callee = await userAPI.getUserByPhone(
        `/user/get-user/${data.IDCallee}`
      );
      try {
        data.caller = caller;
        data.callee = callee;
        setData(data);

        setOpenChildModalConversationInfo("receiveCall", true);
      } catch (e) {
        console.log(e);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    openChildModalConversationInfo.receiveCall &&
    data && (
      <>
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)]" />
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="w-[600px] flex flex-col justify-center items-center bg-blue-600 py-10 rounded-[12px]">
            <Image
              alt=""
              src={data.caller.urlavatar}
              width={60}
              height={60}
              className="size-[60px] rounded-full"
            />
            <span className="text-white mt-2 font-[500]">
              {data.caller.fullname}
            </span>
            <span className="text-white mt-2">TinTin: Cuộc gọi video đến</span>
            <div className="flex justify-center items-center gap-3 py-4">
              <Button
                className="size-[60px] rounded-full bg-red-600 flex justify-center items-center"
                onClick={onRejectCall}
              >
                <PhoneMissed />
              </Button>
              <Button
                onClick={() => onAcceptCall(true)}
                className="size-[60px] rounded-full bg-green-600 flex justify-center items-center"
              >
                <Video />
              </Button>
            </div>
            <div>
              <Button
                variant="outline"
                className="mt-1 gap-2"
                onClick={() => onAcceptCall(false)}
              >
                <VideoOff />
                Trả lời không mở camera
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ReceiveCallModal;
