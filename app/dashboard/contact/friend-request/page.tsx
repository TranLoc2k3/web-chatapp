"use client";
import FriendRequestContent from "@/app/components/main-content/ConTactMainContent/FriendRequestContent";
import Header from "@/app/components/main-content/ConTactMainContent/header/Header";
import { useBearStore } from "@/app/global-state/store";
import { Mail } from "lucide-react";
function FriendList({ children }: { children: React.ReactNode }) {
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);
  return (
    <div>
      <Header
        icon={<Mail />}
        title={`Lời mời kết bạn (${countFriendRequest})`}
      />
      <div className="p-6">
        <FriendRequestContent />
      </div>
    </div>
  );
}

export default FriendList;
