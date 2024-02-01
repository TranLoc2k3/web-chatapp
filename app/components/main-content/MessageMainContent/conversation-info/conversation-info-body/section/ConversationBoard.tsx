import { AlarmClock, NotebookPen } from "lucide-react";
import SectionWrapper, { SectionButton } from "./SectionWrapper";

function ConversationBoard() {
  return (
    <div>
      <SectionWrapper title="Bảng tin hội thoại">
        <SectionButton
          title="Danh sách nhắc hẹn"
          icon={<AlarmClock strokeWidth={1.5} />}
        />
        <SectionButton
          title="Ghi chú, ghim, bình chọn"
          icon={<NotebookPen strokeWidth={1.5} />}
        />
      </SectionWrapper>
    </div>
  );
}

export default ConversationBoard;
