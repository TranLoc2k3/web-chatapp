/* eslint-disable react-hooks/exhaustive-deps */
import { useBearStore } from "@/app/global-state/store";
import { MessageItemProps } from "@/app/types";
import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import MessageItem from "./MessageItem";
interface MessageItemI {
  searchTerm: string;
}
function ConversationList({ searchTerm }: MessageItemI) {
  const username = useSession().data?.token?.user;
  const setGlobalConversations = useBearStore(
    (state) => state.setConversations
  );
  const currentConversationID = usePathname();
  const globalConversations = useBearStore((state) => state.conversations);
  const router = useRouter();

  useEffect(() => {
    username && socket.emit("load_conversations", { IDUser: username });

    socket.on("new_group_conversation", (data) => {
      username && socket.emit("load_conversations", { IDUser: username });
    });
  }, [username]);

  useEffect(() => {
    socket.on("load_conversations_server", (data: any) => {
      const isExistConversation = data.find(
        (item: any) =>
          item.IDConversation === currentConversationID.split("/")[3]
      );

      if (!isExistConversation && currentConversationID.split("/")[3])
        router.push("/dashboard/messages");

      setGlobalConversations(data);
    });
  }, [currentConversationID]);

  useEffect(() => {
    const loadConversationAfterReceiveMsg = (data: any) => {
      username && socket.emit("load_conversations", { IDUser: username });
    };
    socket.on("receive_message", loadConversationAfterReceiveMsg);
    return () => {
      socket.off("receive_message", loadConversationAfterReceiveMsg);
    };
  }, []);
  return (
    <div>
      {globalConversations.map((conversation: any) => (
        <MessageItem
          key={conversation.IDConversation}
          conversation={conversation}
        />
      ))}
    </div>
  );
}

export default ConversationList;
