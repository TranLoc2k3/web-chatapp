/* eslint-disable react-hooks/exhaustive-deps */
import { useBearStore } from "@/app/global-state/store";
import { MessageItemProps, TypeMessage } from "@/app/types";
import { convertISOToDDMMYYY } from "@/app/utils/datetimeUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosClient } from "@/configs/axios.config";
import { socket } from "@/configs/socket";
import { cn } from "@/lib/utils";
import { CircleEllipsis } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { LegacyRef, forwardRef, useEffect, useMemo, useState } from "react";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";
import { ThreeDot } from "./ThreeDot";

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
    const setReplyMessageData = useBearStore(
      (state) => state.setReplyMessageData
    );
    const { setOpenChildModalConversationInfo, setForwardMessage } =
      useBearStore((state) => ({
        setOpenChildModalConversationInfo:
          state.setOpenChildModalConversationInfo,
        setForwardMessage: state.setForwardMessage,
      }));
    const currentSender = useMemo(() => {
      return message.userSender;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
    const onDelete = async () => {
      const res = await axiosClient.post("message/remove", {
        IDMessageDetail: message.IDMessageDetail,
      });
      if (res.data) {
        setMessage((prev) => ({ ...prev, isRemove: true }));
      }
    };

    const onRecall = () => {
      socket.emit("recallMessage", {
        IDMessageDetail: message.IDMessageDetail,
      });
    };

    const onReply = () => {
      setReplyMessageData({
        IDConversation: message.IDConversation,
        IDReplyMessage: message.IDMessageDetail,
        IDUser: session.data?.token.user,
        content: "",
      });
    };

    const onForward = () => {
      setForwardMessage(message);
      setOpenChildModalConversationInfo("forwardMessage", true);
    };

    const isSend = useMemo(() => {
      return message.IDSender === session.data?.token.user;
    }, [session]);

    useEffect(() => {
      socket.on("changeStateMessage", (data) => {
        if (data.IDMessageDetail === message.IDMessageDetail) {
          setMessage((prev) => ({ ...prev, isRecall: true }));
        }
      });
      return () => {
        socket.off("changeStateMessage");
      };
    }, []);

    if (message.isRemove) return null;

    return (
      <div className="relative">
        <div
          ref={ref}
          className={cn(
            "flex gap-3 mx-4 mb-2 relative",
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
          {message.isRecall ? (
            <div
              className={cn(
                "p-3 rounded-[8px] w-[400px] max-w-[calc(100%-100px)",
                `${isSend ? "bg-[#e5efff]" : "bg-white"}`
              )}
            >
              <p className="break-all text-[rgba(0,0,0,0.3)]">
                Tin nhắn đã bị thu hồi
              </p>
              <p className="text-[#476285] text-xs mt-3 flex justify-between items-center">
                {convertISOToDDMMYYY(message.dateTime)}
              </p>
            </div>
          ) : (
            <div
              className={cn(
                "p-3 rounded-[8px] w-[400px] max-w-[calc(100%-100px)] relative",
                `${
                  message.type === TypeMessage.IMAGE ||
                  message.type === TypeMessage.VIDEO
                    ? "bg-transparent"
                    : "bg-white"
                }`,
                `${isSend ? "bg-[#e5efff]" : ""}`
              )}
            >
              <>
                {!isSend && (
                  <p className="text-[#7589A3] text-sm mb-3">
                    {currentSender?.fullname}
                  </p>
                )}
                {message.isReply && (
                  <p className="text-[#7589A3] italic">Tin nhắn phản hồi</p>
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
              </>
              <div className="pt-2" />
              {currentSender?.ID === session.data?.token.user ? (
                // <ContextMenuContent>
                //   <ContextMenuItem onClick={onDelete}>Xóa</ContextMenuItem>
                //   <ContextMenuItem onClick={onRecall}>Thu hồi</ContextMenuItem>
                // </ContextMenuContent>

                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute bottom-1 right-2 hover:bg-[rgba(174,172,172,0.3)] rounded-[6px]">
                    <ThreeDot />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={onDelete}>Xóa</DropdownMenuItem>
                    <DropdownMenuItem onClick={onRecall}>
                      Thu hồi
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onForward}>
                      Chuyển tiếp
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute bottom-1 right-2 hover:bg-[rgba(174,172,172,0.3)] rounded-[6px]">
                    <ThreeDot />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={onReply}>
                      Trả lời
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onForward}>
                      Chuyển tiếp
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default MessageItem;
