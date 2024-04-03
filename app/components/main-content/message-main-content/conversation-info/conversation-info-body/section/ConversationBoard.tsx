import { AlarmClock, NotebookPen, UsersRound } from "lucide-react";
import SectionWrapper, { SectionButton } from "./SectionWrapper";
import { TYPE_GROUP } from "@/app/types";
import { iconStyle } from "@/app/utils/iconStyle";

interface IProps {
  typeGroup: TYPE_GROUP;
}
function ConversationBoard({ typeGroup }: IProps) {
  return (
    <div>
      <SectionWrapper title="Bảng tin hội thoại">
        <SectionButton
          title="Danh sách nhắc hẹn"
          icon={<AlarmClock {...iconStyle} />}
        />
        {typeGroup !== TYPE_GROUP.GROUP ? (
          <SectionButton
            title="Ghi chú, ghim, bình chọn"
            icon={<NotebookPen {...iconStyle} />}
          />
        ) : (
          <SectionButton
            title="1 nhóm chung"
            icon={<UsersRound {...iconStyle} />}
          />
        )}
      </SectionWrapper>
    </div>
  );
}

export default ConversationBoard;
