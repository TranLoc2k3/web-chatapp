"use client";
import { ArrowUpDown, ArrowUpNarrowWide, Search } from "lucide-react";
import { useRef, useState } from "react";
import FriendListItem from "./FriendListItem";
const fakeFriendList = [
  {
    id: 412,
    fullName: "John Doe",
    avatar:
      "https://i.pinimg.com/736x/11/c6/69/11c66931d632cb67e4867b6f41831a6f.jpg",
  },
  {
    id: 4214,
    fullName: "Jane Smith",
    avatar:
      "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg",
  },
  {
    id: 4214,
    fullName: "Jane Smith",
    avatar:
      "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg",
  },
  {
    id: 4214,
    fullName: "Jane Smith",
    avatar:
      "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg",
  },
  // Thêm các dữ liệu giả mạo khác tại đây...
];

const FriendListContent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [friendList, setFriendList] = useState<any>(fakeFriendList);
  const [countFriend, setCountFriend] = useState<number>(0);

  const handleSearchClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <p>
        Bạn bè <span>{`(${countFriend})`}</span>
      </p>
      <div className="mt-4 flex space-x-2">
        <div
          className=" border-2 flex space-x-2 w-[30%] h-[30px] p-1 flex items-center"
          onClick={handleSearchClick}
        >
          <Search className="hover:cursor-pointer w-[15px] ml-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm bạn"
            className="text-sm"
          />
        </div>
        <div className=" border-2 flex space-x-2 w-[20%] h-[30px] p-1 flex items-center bg-slate-200">
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
        <div className=" border-2 flex space-x-2 w-[20%] h-[30px] p-1 flex items-center bg-slate-200">
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
            key={friend.id}
            ID={friend.id}
            avatar={friend.avatar}
            fullName={friend.fullName}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendListContent;
