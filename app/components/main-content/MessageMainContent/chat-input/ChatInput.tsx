"use client";
import Image from "next/image";
import { useState } from "react";
import pictureIcon from "@/public/icon/picture.svg";
import paperclipIcon from "@/public/icon/paperclip.svg";
import { ThumbsUp, Smile, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="flex items-center h-10 bg-white">
        {/* Tam thoi */}
        <Image
          className="hover:bg-gray-200 rounded-lg mx-2 ml-12"
          src={pictureIcon}
          alt="Open picture icon"
          height={25}
          width={25}
        />
        {/* Tam thoi */}
        <Image
          className="hover:bg-gray-200 rounded-lg mx-2"
          src={paperclipIcon}
          alt="Open picture icon"
          height={25}
          width={25}
        />
      </div>
      <div className="flex items-center bg-white border-t-2 flex-grow space-x-1">
        <input
          className="w-8/12 h-10 mx-12"
          type="text"
          placeholder="Nhập tin nhắn..."
          onChange={handleChange}
        />
        <Button size="icon" variant="icon">
          <MessageSquareText width={25} height={25} strokeWidth={1.6} />
        </Button>
        <Button size="icon" variant="icon">
          <Smile width={25} height={25} strokeWidth={1.6} />
        </Button>
        {showLikeIcon ? (
          <button className="mx-2 text-xl text-slate-600"> Gửi </button>
        ) : (
          <Button size="icon" variant="icon">
            <ThumbsUp width={25} height={25} strokeWidth={1.6} />
          </Button>
        )}
      </div>
    </div>
  );
}
