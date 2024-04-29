/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Receiver {
  ID: string;
  fullname: string;
  urlavatar: string;
}
interface MessageDetail {
  IDConversation: string;
  IDMessageDetail: string;
  IDSender: string;
  content: string;
  dateTime: string;
  isRecall: boolean;
  isRemove: boolean;
  type: string;
}
interface Conversation {
  IDConversation: string;
  IDReceiver: string;
  IDSender: string;
  MessageDetail: MessageDetail;
  Receiver: Receiver;
  isGroup: boolean;
  lastChange: string;
}
interface MessageItemProps {
  conversation: Conversation; // Thay vì user, sử dụng conversation chứa thông tin đầy đủ của cuộc trò chuyện
}

function MessageItem({ conversation }: MessageItemProps) {
  const receiver = conversation.Receiver;
  const messageDetail = conversation.MessageDetail;
  const [textTime, setTextTime] = useState<string>("");
  useEffect(() => {
    let timeString = messageDetail?.dateTime;
    let timeMessage = new Date(timeString);
    let timeCurrent = new Date();
    const timeProcess = Math.round(
      (timeCurrent.getTime() - timeMessage.getTime()) / 1000
    );
    if (timeProcess < 60) {
      setTextTime("vài giây trước");
    } else if (timeProcess < 3600) {
      setTextTime(Math.floor(timeProcess / 60) + " phút trước");
    } else if (timeProcess < 86400) {
      Math.floor(timeProcess / 3600) + " giờ trước";
    } else {
      const daysAgo = Math.floor(timeProcess / 86400);
      setTextTime(daysAgo + " ngày trước");
    }
  }, []);

  return (
    <div>
      <Link href={`/dashboard/messages/${conversation.IDConversation}`}>
        <div className="h-[74px] flex items-center cursor-pointer hover:bg-[#f3f5f6] px-4">
          <Avatar className="size-12">
            <AvatarImage src={receiver?.urlavatar} />
            <AvatarFallback>{receiver?.fullname}</AvatarFallback>
          </Avatar>
          <div className="ml-3 w-full">
            <div className="flex w-full justify-between">
              <p className="text-base font-medium text-[#081c36]">
                {receiver?.fullname}
              </p>
              <p className="text-[12px]">
                {!textTime.includes("NaN") && textTime}
              </p>
            </div>
            {/* Sử dụng các thông tin từ cuộc trò chuyện, ví dụ: */}
            <p className="text-[#7589a3] text-[11px] text-ellipsis whitespace-nowrap break-all overflow-hidden max-w-[250px]">
              Tin nhắn: {
                  messageDetail?.type === 'text' ? messageDetail.content :
                  messageDetail?.type === 'file' ? "Tệp mới được gửi" :
                  messageDetail?.type === 'image' ? "Hình ảnh mới được gửi" :
                  messageDetail?.type === 'video' ? "Video mới được gửi" :
                  messageDetail?.type === 'link' ? "Liên kết mới được gửi" :
                  messageDetail?.content
              }
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MessageItem;
