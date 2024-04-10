  import MessageItem from "./MessageItem";
  import { useEffect, useState } from "react";
  import { socket } from "@/configs/socket";
  import { useSession } from "next-auth/react";
  import { set } from "date-fns";
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
    const [conversations, setConversations] = useState<Conversation[]>([]);
    
    useEffect(() => {
      // Gắn data vào message nha Quý, cái này để Quý gắn lại chứ tui chưa gắn
      // Chú ý là có thể không có thuộc tính MessageDetail trong data trả về trong lần đầu vì chưa có tin nhắn mới
      // Check có thì hiển thị tin nhắn đó danh sách cuộc hội thoại
      // socket.emit("load_conversations", { IDUser: "84355887042" })
      socket.emit("load_conversations", { IDUser: username })
      socket.on("load_conversations_server", (data:any) => {
        // console.log("Running here")
        console.log(data);
        setConversations(data);
      });
    }, []);
    const filteredUsers = conversations.filter((conversation) => conversation.Receiver.ID.includes(searchTerm));

    return (
      <div>
        {filteredUsers.map((conversation) => (
          <MessageItem key={conversation.Receiver.ID} conversation={conversation} />
        ))}
      </div>
    );
  }

  export default ConversationList;
