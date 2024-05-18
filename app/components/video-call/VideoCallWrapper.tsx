"use client";
import { useBearStore } from "@/app/global-state/store";
import VideoCall from "./VideoCall";
import ReceiveCallModal from "./ReceiveCallModal";
import { useState } from "react";
import Room from "./GroupCall";

function VideoCallWrapper() {
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const { openChildModalConversationInfo, setOpenChildModalConversationInfo } =
    useBearStore((state) => ({
      openChildModalConversationInfo: state.openChildModalConversationInfo,
      setOpenChildModalConversationInfo:
        state.setOpenChildModalConversationInfo,
    }));
  return (
    <>
      <ReceiveCallModal setOpenCamera={setOpenCamera} setUser={setUser} />
      {openChildModalConversationInfo.videoCall && (
        <VideoCall openCamera={openCamera} userP={user} />
      )}
      {openChildModalConversationInfo.groupCall && (
        <Room roomID="6482230f-f9e7-45c6-81cc-f2102f7e3263" />
      )}
    </>
  );
}

export default VideoCallWrapper;
