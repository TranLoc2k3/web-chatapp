import { TYPE_GROUP } from "@/app/types";
import { cn } from "@/lib/utils";
import MessageThread from "./MessageThread";
import ChatInput from "./chat-input/ChatInput";
import ConversationInfo from "./conversation-info/ConversationInfo";
import Header from "./header/Header";

function MessageMainContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute top-0 left-16 w-[calc(100%-64px)] h-full bg-[#f5f6f7] overflow-hidden",
        "md:relative md:left-0 md:w-full md:flex"
      )}
    >
      <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden">
        <Header />
        <MessageThread />
        <ChatInput />
      </div>
      <ConversationInfo type={TYPE_GROUP.GROUP} />
    </div>
  );
}

export default MessageMainContent;
