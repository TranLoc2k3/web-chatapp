import dynamic from "next/dynamic";
import Album from "./section/AlbumShared/Album";
import ConversationBoard from "./section/ConversationBoard";
import ConversationMember from "./section/ConversationMember";
import FileShared from "./section/FileShared/FileShared";
import LinkShared from "./section/LinkShared/LinkShared";
import { TYPE_GROUP } from "@/app/types";
const SecuritySetting = dynamic(
  () => import("./section/SecuritySetting/SecuritySetting"),
  {
    ssr: false,
  }
);

interface IProps {
  typeGroup: TYPE_GROUP;
}

function ConversationInfoBody({ typeGroup }: IProps) {
  return (
    <div>
      {typeGroup === TYPE_GROUP.GROUP && (
        <ConversationMember memberList={[1, 2, 3, 4,5,132,42,4]} />
      )}
      <ConversationBoard typeGroup={typeGroup} />
      <Album />
      <FileShared />
      <LinkShared />
      <SecuritySetting typeGroup={typeGroup} />
    </div>
  );
}

export default ConversationInfoBody;
