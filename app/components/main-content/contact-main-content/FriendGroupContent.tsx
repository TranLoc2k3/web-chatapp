"use client";
import { useState } from "react";
const fakeFriendList = [
    {
      id: 412,
      fullName: "John Doe",
      avatar: "https://example.com/avatar1.jpg",
      status: "online",
      friendshipStatus: "friend",
    },
    {
      id: 4214,
      fullName: "Jane Smith",
      avatar: "https://example.com/avatar2.jpg",
      status: "offline",
      friendshipStatus: "pending",
    },
    // Thêm các dữ liệu giả mạo khác tại đây...
  ];


const FriendGroupContent= async()=> {
   const [friendList, setFriendList] = useState<any>(fakeFriendList);
   const [countFriend, setCountFriend] = useState<number>(0);
    return ( 
        <div>
            <p>Bạn bè <span>(countFriend)</span></p>
        </div>
     );
}

export default FriendGroupContent;