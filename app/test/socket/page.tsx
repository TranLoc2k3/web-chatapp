/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { socket } from "@/configs/socket";

export default function Home() {
  const [friendRequest, setFriendRequest] = useState<any>([]);

  //
  useEffect(() => {
    socket.on("new friend request server", (data) => {
      setFriendRequest([...friendRequest, data]);
    });
    return () => {
      socket.off("new friend request server");
    };
  }, []);

  const handleSendRequest = () => {
    const payload = {
      senderId: "84704462651",
      receiverId: "0355887042",
      socketId: socket.id,
    };
    socket.emit("new friend request client", payload);
  };

  return (
    <div>
      <button onClick={handleSendRequest}>Gửi kết bạn</button>
      <div>
        {friendRequest.map((item: any) => (
          <div key={item}>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  );
}
