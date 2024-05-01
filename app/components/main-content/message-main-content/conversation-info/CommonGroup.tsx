import { useBearStore } from "@/app/global-state/store";
import { ConversationItemProps } from "@/app/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import ContentLayout from "./ContentLayout";
import { Button } from "@/components/ui/button";

const CommonGroupItem = ({
  conversation,
}: {
  conversation: ConversationItemProps;
}) => {
  return (
    <div className="flex items-center gap-2 py-1 my-1 px-2 rounded-[6px] hover:bg-[rgba(69,67,67,0.1)] cursor-pointer">
      {conversation.groupAvatar && (
        <Image
          alt=""
          src={conversation.groupAvatar}
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
      )}
      <p className="text-sm font-[500]">{conversation.groupName}</p>
    </div>
  );
};

function CommonGroup() {
  const conversations = useBearStore((state) => state.conversations);
  const pathname = usePathname();
  const { openChildModalConversationInfo, setOpenChildModalConversationInfo } =
    useBearStore((state) => ({
      openChildModalConversationInfo: state.openChildModalConversationInfo,
      setOpenChildModalConversationInfo:
        state.setOpenChildModalConversationInfo,
    }));

  const currentConversation: ConversationItemProps = useMemo(() => {
    const currentIdConversation = pathname.split("/")[3];
    return conversations.find(
      (conversation: any) =>
        conversation.IDConversation === currentIdConversation
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);
  const commonGroup = useMemo(() => {
    return conversations.filter((conversation: ConversationItemProps) => {
      return (
        conversation.isGroup &&
        conversation.groupMembers.includes(currentConversation?.IDReceiver)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  return (
    openChildModalConversationInfo.commonGroup && (
      <ContentLayout title="Nhóm chung">
        <Button
          variant="outline"
          className="my-4 w-full h-8 bg-[#EAEDF0] hover:bg-[#DFE2E7]"
          onClick={() =>
            setOpenChildModalConversationInfo("addMemberIntoGroup", true)
          }
        >
          Thêm vào nhóm
        </Button>
        <div className="py-2">
          {commonGroup.map((group: ConversationItemProps) => (
            <CommonGroupItem conversation={group} key={group.IDConversation} />
          ))}
        </div>
      </ContentLayout>
    )
  );
}

export default CommonGroup;
