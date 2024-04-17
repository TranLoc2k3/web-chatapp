import { userAPI } from "@/api/userAPI";
import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { useBearStore } from "@/app/global-state/store";
interface Conversation {
  IDConversation: string;
  IDReceiver: string;
  IDSender: string;
  Receiver: {
    ID: string;
    fullname: string;
    urlavatar: string;
  };
  isGroup: boolean;
  lastChange: string;
}
interface MessageItemProps {
  searchTerm: string;
}
function ConversationList({ searchTerm }: MessageItemProps) {
  const username = useSession().data?.token?.user;
  // const [conversations, setConversations] = useState<Conversation[]>([]);
  const setGlobalConversations = useBearStore(
    (state) => state.setConversations
  );
  const globalConversations = useBearStore((state) => state.conversations);

  useEffect(() => {
    // Gắn data vào message nha Quý, cái này để Quý gắn lại chứ tui chưa gắn
    // Chú ý là có thể không có thuộc tính MessageDetail trong data trả về trong lần đầu vì chưa có tin nhắn mới
    // Check có thì hiển thị tin nhắn đó danh sách cuộc hội thoại
    // socket.emit("load_conversations", { IDUser: "84355887042" })
    username && socket.emit("load_conversations", { IDUser: username });

    username &&
      socket.on("new_group_conversation", (data) => {
        socket.emit("load_conversations", { IDUser: username });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  useEffect(() => {
    socket.on("load_conversations_server", (data: any) => {
      console.log(data);
      
      // setConversations(data);
      setGlobalConversations(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("data quy:")
console.log(globalConversations)
  const filteredUsers = globalConversations.filter(
    (conversation: any) => conversation.Receiver
  );

  return (
    <div>
      {filteredUsers.map((conversation: any) => (
        <MessageItem
          key={conversation.IDConversation}
          conversation={conversation}
        />
      ))}
    </div>
  );
}

export default ConversationList;
