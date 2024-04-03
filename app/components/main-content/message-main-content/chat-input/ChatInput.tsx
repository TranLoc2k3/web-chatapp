"use client";
import Image from "next/image";
import { useState } from "react";
import pictureIcon from "@/public/icon/picture.svg";
import paperclipIcon from "@/public/icon/paperclip.svg";
import {
  ThumbsUp,
  Smile,
  MessageSquareText,
  Link,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { iconStyle } from "@/app/utils/iconStyle";
export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const [showLikeIcon, setShowLikeIcon] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowLikeIcon(value !== "");
  };

  return (
    <div className="absolute left-0 bottom-0 h-24 w-full flex flex-col">
      <div className="flex items-center h-10 bg-white px-3 gap-2">
        <Button size="icon" variant="icon">
          <Link {...iconStyle} />
        </Button>
        <Button size="icon" variant="icon">
          <ImageIcon {...iconStyle} />
        </Button>
      </div>
      <div className="flex items-center bg-white border-t-2 flex-grow space-x-1 justify-between">
        <input
          className="w-8/12 h-10 px-3"
          type="text"
          placeholder="Nhập tin nhắn..."
          onChange={handleChange}
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
  );
}
