"use client";
import { Contact, Contact2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MessageTabHeader from "./message-tab/MessageTabHeader";
import { useBearStore } from "@/app/global-state/store";
const ContactTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <MessageTabHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div>
        <Link
          href={`/dashboard/contact/friend-list`}
          key={"friend-list"}
          className={`flex p-5 hover:bg-slate-200 z-10 ${
            activeIndex === 0 ? "bg-blue-300 z-20" : ""
          }`}
          onClick={() => handleClick(0)}
        >
          <Contact />
          <h3 className="ml-2">Danh sách bạn bè</h3>
        </Link>
        <Link
          href={`/dashboard/contact/friend-group`}
          key={"friend-group"}
          className={`flex p-5 hover:bg-slate-200 ${
            activeIndex === 1 ? "bg-blue-300" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          <Contact2 />

          <h3 className="ml-2">Danh Sách nhóm</h3>
        </Link>
        <Link
          href={`/dashboard/contact/friend-request`}
          key={"friend-request"}
          className={`flex p-5 hover:bg-slate-200 ${
            activeIndex === 2 ? "bg-blue-300" : ""
          }`}
          onClick={() => handleClick(2)}
        >
          <Mail />
          <h3 className="ml-2">{`Lời mời kết bạn (${countFriendRequest})`}</h3>
        </Link>
      </div>
    </div>
  );
};
export default ContactTab;
