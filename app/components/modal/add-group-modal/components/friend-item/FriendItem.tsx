"use client";
import React from "react";
import { Camera, Check, Search, X } from "lucide-react";
interface ItemFriend {
  id: number;
  name: string;
  phone: string;
  imageUrl: string;
}
interface FriendItemProps {
  item: ItemFriend;
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
      <img src={item.imageUrl} className="w-8 h-w-8 rounded-full w-8 h-10" />
      <div className="ml-3">
        <h2 className="font-bold">{item.name}</h2>
        <p>{item.phone}</p>
      </div>
    </div>
  );
};

export default FriendItem;
