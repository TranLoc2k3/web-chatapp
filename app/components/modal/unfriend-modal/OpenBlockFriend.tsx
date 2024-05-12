import { useSession } from "next-auth/react";
import { useState } from "react";

function BlockFriend(senderId: string|any) {
  const { user } = useSession().data?.token;
  const handleOpenBlockFriend = () => {
    console.log("Block friend");
  };
  return (
    <div className="flex justify-center items-center bg-slate-300 p-4 flex-col">
      <h1 className="text-[22px] text-red-700">Không thể kết nối vì đã chặn</h1>
      {senderId === user && (
        <button
          className="mt-4 p-2 bg-red-400 text-white hover:bg-red-500"
          onClick={handleOpenBlockFriend}
        >
          Mở chặn
        </button>
      )}
    </div>
  );
}

export default BlockFriend;
