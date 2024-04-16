/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Camera, Check, Search, X } from "lucide-react";
import { UserProps } from "@/app/types";
interface FriendItemProps {
  item: UserProps;
  isChecked: boolean;
  handleCheck: () => void;
}
const FriendItem: React.FC<FriendItemProps> = ({
  item,
  isChecked,
  handleCheck,
}) => {
  return (
    <div
      className="p-4 pt-2 pb-2 flex mt-2 text-[12px] relative hover:bg-slate-200 w-full rounded-lg cursor-pointer"
      onClick={handleCheck}
    >
      <div
        className={`mt-2 mr-2 border-2  h-5 w-5 rounded-full ${
          isChecked
            ? "bg-blue-500 border-2 border-blue-500"
            : "border-neutral-400"
        }`}
      >
        {isChecked && <Check className=" h-4 w-4 text-white" />}
      </div>
      <img src={item.urlavatar} className="size-8 rounded-full" alt="" />
      <div className="ml-3">
        <h2 className="font-bold">{item.fullname}</h2>
        <p>{item.phone}</p>
      </div>
    </div>
  );
};

export default FriendItem;
