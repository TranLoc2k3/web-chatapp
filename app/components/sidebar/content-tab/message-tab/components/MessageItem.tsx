import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Receiver {
  ID: string;
  fullname: string;
  urlavatar: string;
}

interface Conversation {
  IDConversation: string;
  IDReceiver: string;
  IDSender: string;
  Receiver: Receiver;
  isGroup: boolean;
  lastChange: string;
}

interface MessageItemProps {
  conversation: Conversation; // Thay vì user, sử dụng conversation chứa thông tin đầy đủ của cuộc trò chuyện
}

function MessageItem({ conversation }: MessageItemProps) {
  const receiver = conversation.Receiver;

  return (
    <div>
      <Link href={`/dashboard/messages/${receiver.ID}`} key={receiver.ID}>
        <div className="h-[74px] flex items-center cursor-pointer hover:bg-[#f3f5f6] px-4">
          <Avatar className="size-12">
            <AvatarImage src={receiver.urlavatar} />
            <AvatarFallback>{receiver.fullname}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-base font-medium text-[#081c36]">{receiver.fullname}</p>
            {/* Sử dụng các thông tin từ cuộc trò chuyện, ví dụ: */}
            <p className="text-sm text-[#7589a3]">Tin nhắn mới</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MessageItem;
