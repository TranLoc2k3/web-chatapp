/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Camera, Check, Search, X } from "lucide-react";
import { ConversationItemProps, UserProps } from "@/app/types";
interface FriendItemProps {
  item: ConversationItemProps;
  isChecked: boolean;
  handleCheck: () => void;
}
const GroupItem: React.FC<FriendItemProps> = ({
  item,
  isChecked,
  handleCheck,
}) => {
  return (
    <div
      className="items-center p-4 pt-2 pb-2 flex mt-2 text-[12px] relative hover:bg-slate-200 w-full rounded-lg cursor-pointer"
      onClick={handleCheck}
    >
      <div
        className={`border-2 size-5 mr-3 rounded-full ${
          isChecked
            ? "bg-blue-500 border-2 border-blue-500"
            : "border-neutral-400"
        }`}
      >
        {isChecked && <Check className=" h-4 w-4 text-white" />}
      </div>
      <img
        src={item.groupAvatar ? item.groupAvatar : item.Receiver.urlavatar}
        className="size-8 rounded-full"
        alt=""
      />
      <div className="ml-3">
        <h2 className="font-bold">
          {item.groupName ? item.groupName : item.Receiver.fullname}
        </h2>
      </div>
    </div>
  );
};

export default GroupItem;
