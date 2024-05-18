"use client";
import { ArrowUpDown, ArrowUpNarrowWide, Search } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import FriendListItem from "./FriendListItem";
import { axiosClient } from "@/configs/axios.config";
import { userAPI } from "@/api/userAPI";
import { useSession } from "next-auth/react";

import SearchFriend from "./components/SearchFriend";
const FriendListContent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [friendList, setFriendList] = useState<any>([]);
  const [countFriend, setCountFriend] = useState<number>(0);
  const username = useSession().data?.token?.user;
  const handleSearchClick = () => {
    inputRef.current?.focus();
  };
  useEffect(() => {
    const fetchFriendList = async () => {
      {
        try {
          const res = await userAPI.getFriendListByUserID(username);
          setFriendList(res.data);
          setCountFriend(res.data.length);
        } catch (error) {
          console.error("Error fetching friend list:", error);
          return;
        }
      }
    };
    username && fetchFriendList();
  }, [username]);
  //  Chức năng tìm kiếm đang bổ sung thêm

  return (
    <div>
      <p>
        Bạn bè <span>{`(${countFriend})`}</span>
      </p>
      <div className="mt-4 flex space-x-2">
        <div
          className=" border-2 flex space-x-2 w-[30%] h-[30px] p-1 items-center"
          onClick={handleSearchClick}
        >
          {/* Search Friend*/}
          <SearchFriend
            onChangeSearch={handleSearchChange}
            searchTerm={searchTerm}
          />
        </div>
        <div className=" border-2 flex space-x-2 w-[20%] h-[30px] p-1 items-center bg-slate-200">
          <ArrowUpDown className="hover:cursor-pointer w-[15px] ml-2" />
          <select
            name=""
            id=""
            className="bg-transparent w-[100%] text-[14px] appearance-none outline-0  py-2"
          >
            <option value="" className="bg-white py-2 ">
              Tên [A-Z]
            </option>
            <option value="" className="bg-white px-4 ">
              Tên [Z-A]
            </option>
          </select>
        </div>
        <div className=" border-2 flex space-x-2 w-[20%] h-[30px] p-1 items-center bg-slate-200">
          <ArrowUpNarrowWide className="hover:cursor-pointer w-[15px] ml-2" />
          <select
            name=""
            id=""
            className="bg-transparent w-[100%] text-[14px] appearance-none outline-0  py-2"
          >
            <option value="" className="bg-white py-2 ">
              Tất cả
            </option>
            <option value="" className="bg-white px-4 ">
              Phân loại
            </option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        {friendList.map((friend: any) => (
          <FriendListItem
            key={friend.ID}
            ID={friend.ID}
            avatar={friend.urlavatar}
            fullName={friend.fullname}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendListContent;
