"use client";
import { ConversationItemProps, TYPE_GROUP } from "@/app/types";
import { cn } from "@/lib/utils";
import MessageThread from "./MessageThread";
import ChatInput from "./chat-input/ChatInput";
import ConversationInfo from "./conversation-info/ConversationInfo";
import Header from "./header/Header";
import { useBearStore } from "@/app/global-state/store";
import { useEffect, useMemo, useState } from "react";
import { axiosClient } from "@/configs/axios.config";
import { usePathname } from "next/navigation";
import BlockFriend from "../../modal/unfriend-modal/OpenBlockFriend";
import { io } from "socket.io-client";
interface Conversation {
  IDConversation: string;
  IDNewestMessage: string;
  IDReceiver: string;
  IDSender: string;
  groupMembers: string[];
  isBlock: boolean;
  isGroup: boolean;
  lastChange: string;
  listFile: string[];
  listImage: string[];
}
function MessageMainContent({ children }: { children: React.ReactNode }) {

  const [isBlockFriend, setIsBlockFriend] = useState(false);
  const [conversationBlock, setConversationBlock] = useState<Conversation>();
  const { isOpenBlockFriend, setIsOpenBlockFriend } = useBearStore(
    (state) => state
  );
  const { setSenders, conversations } = useBearStore((state) => ({
    setSenders: state.setSenders,
    conversations: state.conversations,
  }));
  const pathname = usePathname();
  let senderId: string | any;
  const currentConversation: ConversationItemProps = useMemo(() => {
    const currentIdConversation = pathname.split("/")[3];
    return conversations.find(
      (conversation: any) =>
        conversation.IDConversation === currentIdConversation
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

//  1 chặn input 
  useEffect(() => {
    if(isOpenBlockFriend){
      setIsBlockFriend(true);
    }else{
      setIsBlockFriend(false);
    }
  },[isOpenBlockFriend]);


  useEffect(() => {
    // Xử lý load ảnh ng gửi
    if (!conversations) return;
    let members: any = [];
    const getSender = async () => {
      if (currentConversation.isGroup) {
        // for (let member of currentConversation.groupMembers) {
        //   const sender = await axiosClient.get(`user/get-user/${member}`);
        //   members.push(sender.data);
        // }
        members = currentConversation.groupMembers;
      } else {
        const sender = await axiosClient.get(
          `user/get-user/${currentConversation.IDSender}`
        );
        senderId = sender;
        members.push(sender.data);
        const sender1 = await axiosClient.get(
          `user/get-user/${currentConversation.IDReceiver}`
        );
        members.push(sender1.data);
      }

      setSenders(members);
    };
    currentConversation && getSender();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);
  if (!currentConversation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "absolute top-0 left-16 w-[calc(100%-64px)] h-full bg-[#f5f6f7] overflow-hidden",
        "md:relative md:left-0 md:w-full md:flex"
      )}
    >
      <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden">
        <Header />
        <MessageThread />
        {isOpenBlockFriend ? <BlockFriend senderId={senderId} /> : <ChatInput />}
        
      </div>
      <ConversationInfo
        type={
          currentConversation.isGroup ? TYPE_GROUP.GROUP : TYPE_GROUP.SIGNLE
        }
      />
    </div>
  );
}

export default MessageMainContent;
