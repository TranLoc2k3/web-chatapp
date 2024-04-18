/* eslint-disable react-hooks/exhaustive-deps */
import { userAPI } from "@/api/userAPI";
import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { useBearStore } from "@/app/global-state/store";
import { MessageItemProps } from "@/app/types";
import { usePathname, useRouter } from "next/navigation";
interface Conversation {
  IDConversation: string;
  IDReceiver: string;
  IDSender: string;
  Receiver: {
    ID: string;
    fullname: string;
    urlavatar: string;
  };
  MessageDetail: MessageItemProps;
  isGroup: boolean;
  lastChange: string;
}
interface MessageItemI {
  searchTerm: string;
}
function ConversationList({ searchTerm }: MessageItemI) {
  const username = useSession().data?.token?.user;
  const setGlobalConversations = useBearStore(
    (state) => state.setConversations
  );
  const currentConversationID = usePathname().split("/")[3];
  const globalConversations = useBearStore((state) => state.conversations);
  const router = useRouter();

  useEffect(() => {
    // Gắn data vào message nha Quý, cái này để Quý gắn lại chứ tui chưa gắn
    // Chú ý là có thể không có thuộc tính MessageDetail trong data trả về trong lần đầu vì chưa có tin nhắn mới
    // Check có thì hiển thị tin nhắn đó danh sách cuộc hội thoại
    // socket.emit("load_conversations", { IDUser: "84355887042" })
    username && socket.emit("load_conversations", { IDUser: username });

    socket.on("new_group_conversation", (data) => {
      username && socket.emit("load_conversations", { IDUser: username });
    });
  }, [username]);

  useEffect(() => {
    socket.on("load_conversations_server", (data: any) => {
      // Kiểm tra conversation đang mở có tồn tại trong conversation hay không
      const isExistConversation = data.find(
        (item: any) => item.IDConversation === currentConversationID
      );

      setGlobalConversations(data);
      if (!isExistConversation) router.push("/dashboard/messages");
    });
  }, []);

  useEffect(() => {
    const loadConversationAfterReceiveMsg = (data: MessageItemProps) => {
      console.log(
        "Người nhận receive_message và trigger load conversation chỗ này: ",
        data
      );

      if (data.IDSender !== username) {
        const currentIndex = globalConversations.findIndex(
          (conversation: any) =>
            conversation.IDConversation === data.IDConversation
        );

        if (currentIndex > -1) {
          const updatedConversations = [
            globalConversations[currentIndex],
            ...globalConversations,
          ];

          updatedConversations.splice(currentIndex + 1, 1);

          setGlobalConversations(updatedConversations);
        }
      }
    };
    socket.on("receive_message", loadConversationAfterReceiveMsg);
    return () => {
      socket.off("receive_message", loadConversationAfterReceiveMsg);
    };
  }, []);

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
