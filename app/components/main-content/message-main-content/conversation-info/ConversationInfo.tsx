"use client";
import AddMemberGroup from "@/app/components/modal/AddMemberGroup";
import { useBearStore } from "@/app/global-state/store";
import { ConversationItemProps, TYPE_GROUP } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ChildModal from "./ChildModal";
import ConversationInfoBody from "./conversation-info-body/ConversationInfoBody";
import ConversationInfoHeader from "./conversation-info-header/Header";
import AddMemberToGroup from "@/app/components/modal/AddMemberToGroup";
import ForwardMessageModal from "@/app/components/modal/ForwardMessageModal";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface IProps {
  type: TYPE_GROUP;
}
function ConversationInfo({ type }: IProps) {
  const state = useBearStore();
  const onClose = () => {
    state.setOpenConversationInfo();
  };
  const openChildModalConversationInfo = useBearStore(
    (state) => state.openChildModalConversationInfo
  );
  const { openAddMemberGroup, setOpenMemberGroup, conversations } =
    useBearStore((state) => ({
      openAddMemberGroup: state.openAddMemberGroup,
      setOpenMemberGroup: state.setOpenAddMemberGroup,
      conversations: state.conversations,
    }));

  const setOpenChildModalConversationInfo = useBearStore(
    (state) => state.setOpenChildModalConversationInfo
  );
  const pathname = usePathname();

  const currentConversation: ConversationItemProps = useMemo(() => {
    const currentIdConversation = pathname.split("/")[3];
    return conversations.find(
      (conversation: any) =>
        conversation.IDConversation === currentIdConversation
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0",
          `${state.isOpenConversationInfo ? "" : "hidden"}`,
          "md:hidden"
        )}
      />
      <div
        className={cn(
          "w-[344px] h-dvh shadow-[0_0_10px_rgba(0,0,0,0.25)] bg-white absolute top-0 right-0 z-10 transition-all duration-300",
          `${
            state.isOpenConversationInfo
              ? "translate-x-full w-0"
              : "translate-x-full md:w-[344px] md:translate-x-0"
          }`,
          "md:relative"
        )}
      >
        {/* Title */}
        <div className="h-[68px]">
          <p className="text-[17px] text-[#081c36] font-[600] text-center leading-[68px]">
            {type === TYPE_GROUP.SIGNLE
              ? "Thông tin hội thoại"
              : "Thông tin nhóm"}
          </p>
        </div>
        <Separator
          className="w-full h-[1px] bg-[#d6dbe1]"
          orientation="vertical"
        />
        <ScrollArea className="h-[calc(100%-68px)]">
          {type === TYPE_GROUP.SIGNLE ? (
            <ConversationInfoHeader
              type={type}
              conversationName={currentConversation.Receiver.fullname}
              avatar={currentConversation.Receiver.urlavatar}
            />
          ) : (
            <ConversationInfoHeader
              type={type}
              conversationName={currentConversation.groupName}
              avatar={currentConversation.groupAvatar}
            />
          )}
          <ConversationInfoBody typeGroup={type} />
        </ScrollArea>

        {/* Child Modal */}
        <div
          className={
            openChildModalConversationInfo.member ||
            openChildModalConversationInfo.commonGroup
              ? "absolute size-full top-0 right-0"
              : ""
          }
        >
          <ChildModal />
        </div>
      </div>

      <AddMemberGroup
        isvisible={openAddMemberGroup}
        onClose={setOpenMemberGroup}
      />
      <AddMemberToGroup
        isvisible={openChildModalConversationInfo.addMemberIntoGroup}
        onClose={() =>
          setOpenChildModalConversationInfo("addMemberIntoGroup", false)
        }
      />
      <ForwardMessageModal
        isvisible={openChildModalConversationInfo.forwardMessage}
        onClose={() =>
          setOpenChildModalConversationInfo("forwardMessage", false)
        }
      />
    </>
  );
}

export default ConversationInfo;
