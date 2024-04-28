import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "./BackButton";
import HeaderBtns from "./HeaderBtns";
import { useBearStore } from "@/app/global-state/store";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const conversations = useBearStore((state) => state.conversations)
  const IDConversation = usePathname().split("/")[3]
  const senders = useBearStore((state) => state.senders)
 

  const currentConversation = conversations.find((conversation: any) => conversation.IDConversation === IDConversation)
  const receiver = senders.find((sender: any) => sender.ID === currentConversation.IDReceiver)
  if (!receiver) return null
  return (
    <div className="flex h-[68px] px-4 items-center border-b border-slate-300">
      <div className="flex items-center flex-1 gap-3">
        <div className="md:hidden">
          <BackButton />
        </div>
        <div className="flex items-center justify-center">
          <Avatar className="size-12">
            <AvatarImage src={receiver.urlavatar} className="hover:cursor-pointer" />
            <AvatarFallback>{receiver.fullname}</AvatarFallback>
          </Avatar>
          <div className="header-title pl-4">{receiver.fullname}</div>
        </div>
      </div>
      <HeaderBtns />
      
    </div>
  );
}

export default Header;
