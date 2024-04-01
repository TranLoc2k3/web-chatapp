import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { set } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  image: string;
}
interface MessageItemProps {
  user: User;
}
function MessageItem({ user }: MessageItemProps) {
  return (
    <div>
      <Link href={`/dashboard/messages/${user.id}`} key={user.id}>
        <div className="h-[74px] flex items-center cursor-pointer hover:bg-[#f3f5f6] px-4">
          <Avatar className="size-12">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-base font-medium text-[#081c36]">{user.name}</p>
            <p className="text-sm text-[#7589a3]">Bạn: Hello</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MessageItem;
