"use client"; 
import Image from "next/image";
import { useState } from "react";
import fastMessageIcon from "@/public/icon/fast_message.svg"
import emojiIcon from "@/public/icon/emoji.svg"
import likeIcon from "@/public/icon/like.svg"
import pictureIcon from "@/public/icon/picture.svg"
import paperclipIcon from "@/public/icon/paperclip.svg"
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
                <Image className="hover:bg-gray-200 rounded-lg mx-2 ml-12" src={pictureIcon} alt="Open picture icon" height={25} width={25} />
                <Image className="hover:bg-gray-200 rounded-lg mx-2" src={paperclipIcon} alt="Open picture icon" height={25} width={25} />
            </div>
            <div className="flex items-center bg-white border-t-2 flex-grow">
                <input className="w-8/12 h-10 mx-12" type="text" placeholder="Nhập tin nhắn..." onChange={handleChange}/>
                <Image className="hover:bg-gray-200 rounded-lg mx-2" src={fastMessageIcon} alt="Fast Message icon" height={25} width={25} />
                <Image className="hover:bg-gray-200 rounded-lg mx-2" src={emojiIcon} alt="Emoji icon" height={25} width={25} />
                {
                    showLikeIcon ? 
                    (<button className="mx-2 text-xl text-slate-500"> Gửi </button>) :
                    (<Image className="hover:bg-gray-200 rounded-lg mx-2" src={likeIcon} alt="Emoji icon" height={25} width={25} />)
                }
            </div>
        </div>
    );
}