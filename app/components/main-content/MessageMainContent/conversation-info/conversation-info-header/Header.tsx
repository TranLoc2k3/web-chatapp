import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TYPE_GROUP } from "../ConversationInfo";
import ConversationInfoButton from "./ConversationInfoButton";

interface IProps {
  type: TYPE_GROUP;
  conversationName: string;
}

function ConversationInfoHeader({ type, conversationName }: IProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="size-14 my-3">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-[17px] text-[#081c36] font-[600]">
          {conversationName}
        </p>
        <ConversationInfoButton />
      </div>
    </div>
  );
}

export default ConversationInfoHeader;
