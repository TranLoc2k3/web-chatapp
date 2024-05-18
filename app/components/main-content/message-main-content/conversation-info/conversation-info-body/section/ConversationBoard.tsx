import { AlarmClock, NotebookPen, UsersRound } from "lucide-react";
import SectionWrapper, { SectionButton } from "./SectionWrapper";
import { ConversationItemProps, TYPE_GROUP } from "@/app/types";
import { iconStyle } from "@/app/utils/iconStyle";
import { useBearStore } from "@/app/global-state/store";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface IProps {
  typeGroup: TYPE_GROUP;
}
function ConversationBoard({ typeGroup }: IProps) {
  const conversations = useBearStore((state) => state.conversations);
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
    <div>
      <SectionWrapper title="Bảng tin hội thoại">
        <SectionButton
          title="Danh sách nhắc hẹn"
          icon={<AlarmClock {...iconStyle} />}
        />
        {typeGroup === TYPE_GROUP.GROUP ? (
          <SectionButton
            title="Ghi chú, ghim, bình chọn"
            icon={<NotebookPen {...iconStyle} />}
          />
        ) : (
          <SectionButton
            title={`${commonGroup.length} nhóm chung`}
            icon={<UsersRound {...iconStyle} />}
            onClick={() =>
              setOpenChildModalConversationInfo("commonGroup", true)
            }
          />
        )}
      </SectionWrapper>
    </div>
  );
}

export default ConversationBoard;
