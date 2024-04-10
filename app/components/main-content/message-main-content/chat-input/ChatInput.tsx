"use client";
import { useBearStore } from "@/app/global-state/store";
import { TypeMessage } from "@/app/types";
import { iconStyle } from "@/app/utils/iconStyle";
import { isValidUrl } from "@/app/utils/validUrl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Link,
  MessageSquareText,
  Smile,
  ThumbsUp,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InputPreviewWrapper from "./InputPreviewWrapper";
import LinkPreview from "./LinkPreview";
import { useSession } from "next-auth/react";
const msgItem = {
  idMessageDetail: "id2",
  idSender: "84704462652",
  idConversation: "1",
  type: TypeMessage.FILE,
  content:
    "https://ap-southeast-1.console.aws.amazon.com/s3/object/demo-s3-bucket-iuh?region=ap-southeast-1&bucketType=general&prefix=Tao_XacMinh_ChuKy.docx",
  dateTime: new Date(2023, 12, 25, 15, 30, 10),
  isRemove: false,
};
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
  const setMsgList = useBearStore((state) => state.setMsgList);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage((pre) => ({
      ...pre,
      content: value,
    }));
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
    if (files.length > 0) {
      // Gửi từng file lên server -> nhận lại response khi file upload thành công
      // Add vào msgList -> file covnert sang ObjectURL để view tạm
      files.forEach((file) => {
        setMsgList({
          ...msgItem,
          idMessageDetail: Math.random().toString(),
          content: URL.createObjectURL(file),
          type: TypeMessage.FILE,
          idSender: senderId,
        });
      });
    }
    setMsgList({
      ...msgItem,
      idMessageDetail: Math.random().toString(),
      content: message.content,
      type: message.type,
      idSender: senderId,
    });
    setMessage({
      content: "",
      type: TypeMessage.TEXT,
    });
    setIsLink(false);
    setHeight((pre: number) => (pre === 80 ? pre : pre - 80));
  };

  useEffect(() => {
    if (files.length > 0 && height != 172 && height != 252) {
      setHeight((pre: number) => pre + 92);
    } else if (files.length === 0) {
      setHeight((pre: number) => (pre === 80 ? pre : pre - 92));
    }
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
            <input
              className="w-full h-10 px-3"
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
              <Button size="icon" variant="icon">
                <Smile {...iconStyle} />
              </Button>
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
