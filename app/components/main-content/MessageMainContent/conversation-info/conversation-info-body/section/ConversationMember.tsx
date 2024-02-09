import { Copy, Link, Share, UsersRound } from "lucide-react";
import SectionWrapper, { SectionButton } from "./SectionWrapper";
import { iconStyle } from "@/app/utils/iconStyle";

interface IProps {
  memberList: any[];
}

function ConversationMember({ memberList }: IProps) {
  return (
    <div>
      <SectionWrapper title="Thành viên nhóm">
        <SectionButton
          title={`${memberList.length} thành viên`}
          icon={<UsersRound {...iconStyle} />}
        />
        <SectionButton
          title={`Link tham gia nhóm`}
          icon={<Link {...iconStyle} />}
          subTitle="https://zalo.me/g/ivfwgh854"
          isLink={true}
          rightIconList={[
            {
              icon: (
                <Copy
                  key="copy-icon"
                  width={20}
                  height={20}
                  strokeWidth={1.5}
                />
              ),
            },
            {
              icon: (
                <Share
                  key="share-icon"
                  width={20}
                  height={20}
                  strokeWidth={1.5}
                />
              ),
            },
          ]}
        />
      </SectionWrapper>
    </div>
  );
}

export default ConversationMember;
