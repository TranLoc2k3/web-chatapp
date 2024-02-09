import { cn } from "@/lib/utils";
import Header from "./header/Header";
import ConversationInfo from "./conversation-info/ConversationInfo";
import ChatInput from "./chat-input/ChatInput";
import MessageThread from "./MessageThread";
import { TYPE_GROUP } from "@/app/types";

function MessageMainContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute top-0 left-16 w-[calc(100%-64px)] h-full bg-[#f5f6f7] overflow-hidden",
        "md:relative md:left-0 md:w-full md:flex"
      )}
    >
      <div className="relative flex-1">
        <Header />
        <MessageThread />
        <ChatInput />
      </div>
      <ConversationInfo type={TYPE_GROUP.GROUP} />
    </div>
  );
}

export default MessageMainContent;
