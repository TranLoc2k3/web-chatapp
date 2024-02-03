import { Copy, Link, Share, UsersRound } from "lucide-react";
import SectionWrapper, { SectionButton } from "./SectionWrapper";

interface IProps {
  memberList: any[];
}

function ConversationMember({ memberList }: IProps) {
  return (
    <div>
      <SectionWrapper title="Thành viên nhóm">
        <SectionButton
          title={`${memberList.length} thành viên`}
          icon={<UsersRound strokeWidth={1.5} />}
        />
        <SectionButton
          title={`Link tham gia nhóm`}
          icon={<Link strokeWidth={1.5} />}
          subTitle="https://zalo.me/g/ivfwgh854"
          isLink={true}
          rightIcon={[
            <Copy key="copy-icon" strokeWidth={1.5} />,
            <Share key="share-icon" strokeWidth={1.5} />,
          ]}
        />
      </SectionWrapper>
    </div>
  );
}

export default ConversationMember;
