"use client";
import { useBearStore } from "@/app/global-state/store";
import { TypeMessage } from "@/app/types";
import { iconStyle } from "@/app/utils/iconStyle";
import { isValidUrl } from "@/app/utils/validUrl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { socket } from "@/configs/socket";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Link,
  MessageSquareText,
  Smile,
  ThumbsUp,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InputPreviewWrapper, {
  detectTypeOfPreview,
} from "./InputPreviewWrapper";
import LinkPreview from "./LinkPreview";
import path from "path";
import { usePathname } from "next/navigation";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
export default function ChatInput() {
  const [message, setMessage] = useState({
    content: "",
    type: TypeMessage.TEXT,
  });
  const [height, setHeight] = useState(80);
  const senderId = useSession().data?.token.user;
  const [showLikeIcon, setShowLikeIcon] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLink, setIsLink] = useState(false);
  const { conversations, setConversations } = useBearStore((state) => ({
    conversations: state.conversations,
    setConversations: state.setConversations,
  }));
  const { replyMessageData, setReplyMessageData } = useBearStore((state) => ({
    replyMessageData: state.replyMessageData,
    setReplyMessageData: state.setReplyMessageData,
  }));
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const pathname = usePathname();
  // const setMsgList = useBearStore((state) => state.setMsgList);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage((pre) => ({
      ...pre,
      content: value,
    }));
    setReplyMessageData({
      ...replyMessageData,
      content: value,
    });
    const validUrl = isValidUrl(value);
    setIsLink(validUrl);
    validUrl &&
      setMessage((pre) => ({
        ...pre,
        type: TypeMessage.LINK,
      }));
    validUrl
      ? setHeight((pre: number) => pre + 80)
      : setHeight((pre: number) => {
          if (pre === 80 || pre === 172) return pre;
          else return pre - 80;
        });
    setShowLikeIcon(value !== "");
  };
  const onClickSelectFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const onSendMessage = () => {
    const payload = {
      IDSender: senderId,
      IDConversation: pathname.split("/")[3],
      textMessage: message.content,
      image: [] as any,
      fileList: [] as any,
      video: [] as any,
    };
    let listImages: any = [];
    let fileList: any = [];
    let videoList: any = [];
    if (files.length > 0) {
      files.forEach((file) => {
        if (detectTypeOfPreview(file) === "image") {
          listImages.push(file);
        } else {
          if (file.type.includes("video")) {
            videoList.push(file);
          } else
            fileList.push({
              mimeType: file.type,
              content: file,
              fileName: file.name,
            });
        }
      });
    }

    payload.image = listImages;
    payload.fileList = fileList;
    payload.video = videoList;
    if (senderId) {
      if (replyMessageData && replyMessageData.content.trim() !== "") {
        socket.emit("reply_message", replyMessageData);
        setReplyMessageData(null);
      } else socket.emit("send_message", payload);
      // Load conversation
      // const currentConversations = pathname.split("/")[3];
      // const currentIndex = conversations.findIndex(
      //   (conversation: any) =>
      //     conversation.IDConversation === currentConversations
      // );

      // if (currentIndex > -1) {
      //   // xử lý conversation khi nhắn tự động update cho bên MessageList
      //   if (!conversations[currentIndex]?.MessageDetail)
      //     conversations[currentIndex].MessageDetail = {};
      //   conversations[currentIndex].MessageDetail.type = "text";
      //   // trả về kiểu time nhắn
      //   conversations[currentIndex].MessageDetail.dateTime = new Date();
      //   conversations[currentIndex].MessageDetail.content = payload.textMessage;

      //   const updatedConversations = [
      //     conversations[currentIndex],
      //     ...conversations,
      //   ];

      //   updatedConversations.splice(currentIndex + 1, 1);

      //   setConversations(updatedConversations);
      // }
    }
    setFiles([]);
    setMessage({
      content: "",
      type: TypeMessage.TEXT,
    });
    setIsLink(false);
    setHeight(80);
  };

  useEffect(() => {
    if (files.length > 0 && height != 172 && height != 252) {
      setHeight((pre: number) => pre + 92);
    } else if (files.length === 0) {
      setHeight((pre: number) => (pre === 80 ? pre : pre - 92));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    // h-24
    <div className="bg-white w-full">
      <div
        style={{ height: `${height}px` }}
        className={cn("w-full flex flex-col")}
      >
        <div className="flex items-center h-10 px-3 gap-2 w-full">
          <Button size="icon" variant="icon" onClick={onClickSelectFile}>
            <Link {...iconStyle} />
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={onChangeFile}
              multiple
              value={fileInputRef.current?.name}
            />
          </Button>
          <Button size="icon" variant="icon">
            <ImageIcon {...iconStyle} />
          </Button>
        </div>
        <Separator />
        <div className="w-full">
          {isLink && (
            <div className="mx-2">
              <LinkPreview url={message.content} />{" "}
            </div>
          )}
          <div className="flex flex-1 items-center bg-white flex-grow space-x-1 justify-between">
            {replyMessageData && (
              <p className="pl-2 font-[500] flex items-center gap-1">
                Phản hồi:
                <span>
                  <X
                    onClick={() => setReplyMessageData(null)}
                    className="cursor-pointer"
                  />
                </span>
              </p>
            )}
            <input
              className="flex-1 h-10 px-3"
              type="text"
              placeholder="Nhập tin nhắn..."
              onChange={handleChange}
              value={message.content}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSendMessage();
                }
              }}
            />
            <div className="flex gap-1 !mr-3">
              <Button size="icon" variant="icon">
                <MessageSquareText {...iconStyle} />
              </Button>
              <div>
                <Button
                  onClick={() => setIsOpenEmoji((pre) => !pre)}
                  size="icon"
                  variant="icon"
                  className="relative"
                >
                  <Smile {...iconStyle} />
                  <EmojiPicker
                    open={isOpenEmoji}
                    width={350}
                    height={450}
                    onEmojiClick={(e, emojiObject) => {
                      setMessage((pre) => ({
                        ...pre,
                        content: pre.content + e.emoji,
                      }));
                    }}
                    className="!absolute top-0 left-0 -translate-x-[100%] -translate-y-[100%]"
                  />
                </Button>
              </div>

              {showLikeIcon ? (
                <button className="mx-2 text-xl text-slate-600"> Gửi </button>
              ) : (
                <Button size="icon" variant="icon">
                  <ThumbsUp {...iconStyle} />
                </Button>
              )}
            </div>
          </div>
        </div>
        {files.length > 0 && (
          <>
            <Separator />
            <InputPreviewWrapper setFileList={setFiles} fileList={files} />
          </>
        )}
      </div>
    </div>
  );
}
