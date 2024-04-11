import { useBearStore } from "@/app/global-state/store";
import { MessageItemProps, TypeMessage } from "@/app/types";
import { convertISOToDDMMYYY } from "@/app/utils/datetimeUtils";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { LegacyRef, forwardRef, useMemo, useState } from "react";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { axiosClient } from "@/configs/axios.config";

interface IProps {
  message: MessageItemProps;
}

export const MessageItemLoading = () => {
  return (
    <div className="flex gap-3 mx-4 mb-10 flex-row-reverse">
      <div></div>
      <div className="animate-pulse w-[400px] max-w-[calc(100%-100px)] p-3 rounded-[8px] bg-white">
        <div className="h-4 bg-gray-300 w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-300 w-5/6"></div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const MessageItem = forwardRef(
  (props: IProps, ref: LegacyRef<HTMLDivElement>) => {
    const [message, setMessage] = useState<MessageItemProps>(props.message);
    const session = useSession();
    // Nên store = object thay vì mảng
    const senders = useBearStore((state) => state.senders);
    const currentSender = useMemo(() => {
      return senders.find((sender: any) => sender.ID === message.IDSender);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [senders]);
    const onDelete = async () => {
      const res = await axiosClient.post("message/remove", {
        IDMessageDetail: message.IDMessageDetail,
      });
      if (res.data) {
        setMessage((prev) => ({ ...prev, isRemove: true }));
      }
      console.log(res.data);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isSend = useMemo(
      () => {
        return message.IDSender === session.data?.token.user;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [session]
    );
    if (message.isRemove) return null;
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          {" "}
          <div
            ref={ref}
            className={cn(
              "flex gap-3 mx-4 mb-2",
              `${isSend ? "flex-row-reverse" : ""}`
            )}
          >
            {/* Sender */}
            <div className={isSend ? " self-end" : ""}>
              {currentSender?.urlavatar && !isSend && (
                <Image
                  src={currentSender.urlavatar}
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
                  message.type === TypeMessage.IMAGE
                    ? "bg-transparent"
                    : "bg-white"
                }`,
                `${isSend ? "bg-[#e5efff]" : ""}`
              )}
            >
              {!isSend && (
                <p className="text-[#7589A3] text-sm mb-3">
                  {currentSender?.fullname}
                </p>
              )}
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
                  fileName={message.IDMessageDetail}
                  fileUrl={message.content}
                />
              )}
              {message.type === TypeMessage.IMAGE && (
                <ImageMessage url={message.content} />
              )}
              <p className="text-[#476285] text-xs mt-3 flex justify-between items-center">
                {convertISOToDDMMYYY(message.dateTime)}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onDelete}>Xóa</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }
);

export default MessageItem;
