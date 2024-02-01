import React from "react";
import Image from "next/image";
import ButtonCollapse from "./ButtonCollapse";
import callVideoIcon from "@/public/icon/call_video.svg";
import searchIcon from "@/public/icon/search.svg";
import addFriendIcon from "@/public/icon/add_friend.svg";


function HeaderBtns() {
  return (
    <div className="flex space-x-4">
      <Image className="hover:bg-gray-200 rounded-lg" src={addFriendIcon} alt="search icon" height={20} width={20} />
      <Image className="hover:bg-gray-200 rounded-lg" src={searchIcon} alt="search icon" height={20} width={20}/>
      <Image className="hover:bg-gray-200 rounded-lg" src={callVideoIcon} alt="call video icon" height={24} width={24}/>
      <ButtonCollapse />
    </div>
  );
}

export default HeaderBtns;
