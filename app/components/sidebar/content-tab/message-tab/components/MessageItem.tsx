import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function MessageItem() {
  return (
    <Link href="/dashboard/messages/1">
      <div className="h-[74px] flex items-center cursor-pointer hover:bg-[#f3f5f6] px-4">
        <Avatar className="size-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-base font-medium text-[#081c36]">Công Nghệ Mới</p>
          <p className="text-sm text-[#7589a3]">Bạn: Hello</p>
        </div>
      </div>
    </Link>
  );
}

export default MessageItem;
