import { userAPI } from "@/api/userAPI";
import { MessageItemProps, TypeMessage, UserProps } from "@/app/types";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";

interface IProps {
  message: MessageItemProps;
}

const MessageItem = ({ message }: IProps) => {
  const session = useSession();
  const [sender, setSender] = useState<UserProps | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isSend = useMemo(
    () => message.idSender === session.data?.token.user,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  );
  useEffect(() => {
    const getSender = async () => {
      const res = await userAPI.getUserByPhone(
        `user/get-user/${message.idSender}`
      );
      setSender(res);
    };
    message.idSender && getSender();
  }, [message.idSender]);

  return (
    <div
      className={cn(
        "flex gap-3 mx-4 mb-2",
        `${isSend ? "flex-row-reverse" : ""}`
      )}
    >
      {/* Sender */}
      <div className={isSend ? " self-end" : ""}>
        {sender?.urlavatar && !isSend && (
          <Image
            src={sender.urlavatar}
            alt=""
            width={40}
            height={40}
            className="h-10 rounded-full"
          />
        )}
      </div>
      {/* Content */}
      <div
        className={cn(
          " p-3 rounded-[8px] w-[400px] max-w-[calc(100%-100px)]",
          `${
            message.type === TypeMessage.IMAGE ? "bg-transparent" : "bg-white"
          }`,
          `${isSend ? "bg-[#e5efff]" : ""}`
        )}
      >
        <p className="text-[#7589A3] text-sm mb-3">{sender?.fullname}</p>
        {message.type === TypeMessage.FILE && (
          <FileMessage fileUrl={message.content} />
        )}
        {(message.type === TypeMessage.TEXT ||
          message.type === TypeMessage.LINK) && (
          <TextMessage
            isLink={message.type === TypeMessage.LINK}
            content={message.content}
          />
        )}
        {message.type === TypeMessage.VIDEO && (
          <VideoMessage
            fileName="A"
            fileUrl={message.content}
            fizeSize="18.39 KB"
          />
        )}
        {message.type === TypeMessage.IMAGE && (
          <ImageMessage url={message.content} />
        )}
        <p className="text-[#476285] text-xs mt-3">
          {message.dateTime.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
