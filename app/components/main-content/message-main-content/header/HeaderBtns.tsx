"use client";
import React, { useMemo } from "react";
import ButtonCollapse from "./ButtonCollapse";
import { Video, Search, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBearStore } from "@/app/global-state/store";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { CallStatus, ConversationItemProps } from "@/app/types";
import { socket } from "@/configs/socket";

function HeaderBtns() {
  const setOpenAddMemberGroup = useBearStore(
    (state) => state.setOpenAddMemberGroup
  );
  const { openChildModalConversationInfo, setOpenChildModalConversationInfo } =
    useBearStore((state) => ({
      openChildModalConversationInfo: state.openChildModalConversationInfo,
      setOpenChildModalConversationInfo:
        state.setOpenChildModalConversationInfo,
    }));
  const conversations = useBearStore((state) => state.conversations);
  const pathname = usePathname();
  const currentConversations: ConversationItemProps = useMemo(() => {
    return conversations.find(
      (item: any) => item.IDConversation === pathname.split("/")[3]
    );
  }, [conversations, pathname]);

  const onCall = () => {
    if (currentConversations.isGroup) {
      for (let callee of currentConversations.groupMembers) {
        if (callee !== currentConversations.IDSender) {
          const payload = {
            IDCaller: currentConversations.IDSender,
            IDCallee: callee,
            callType: "group",
          };
          socket.emit("pre-offer-single", payload);
          setOpenChildModalConversationInfo("groupCall", true);
        }
      }
      return;
    }

    const payload = {
      IDCaller: currentConversations.IDSender,
      IDCallee: currentConversations.IDReceiver,
      callType: "single",
    };
    console.log("emit");

    socket.emit("pre-offer-single", payload);
    setOpenChildModalConversationInfo("videoCall", true);
  };

  return (
    <div className="flex space-x-1">
      <Button onClick={setOpenAddMemberGroup} size="icon" variant="icon">
        <UserRoundPlus width={20} height={20} strokeWidth={1.6} />
      </Button>
      <Button size="icon" variant="icon">
        <Search width={20} height={20} strokeWidth={1.6} />
      </Button>
      <Button onClick={onCall} size="icon" variant="icon">
        <Video width={20} height={20} strokeWidth={1.6} />
      </Button>
      <ButtonCollapse />
    </div>
  );
}

export default HeaderBtns;
