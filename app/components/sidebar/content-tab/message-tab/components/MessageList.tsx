/* eslint-disable react-hooks/exhaustive-deps */
import { useBearStore } from "@/app/global-state/store";
import { MessageItemProps } from "@/app/types";
import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { axiosClient } from "@/configs/axios.config";

function ConversationList() {
  const username = useSession().data?.token?.user;
  const setGlobalConversations = useBearStore(
    (state) => state.setConversations
  );
  const searchTerm = useBearStore((state) => state.searchTerm);
  const currentConversationID = usePathname();
  const globalConversations = useBearStore((state) => state.conversations);
  const router = useRouter();
  const [conversations, setConversations] = useState(globalConversations);
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
      setConversations(data);
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
  const IDUser = useSession().data?.token?.user;
  const keyword = searchTerm;
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") {
      setConversations(globalConversations);
      return;
    }
    if (searchTerm) {
      try {
        const results = await axiosClient.post("/conversation/search-group", {
          IDUser,
          keyword,
        });
        setConversations(results.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setConversations(globalConversations);
    }
  };

  return (
    <div>
      {conversations.map((conversation: any) => (
        <MessageItem
          key={conversation.IDConversation}
          conversation={conversation}
        />
      ))}
    </div>
  );
}

export default ConversationList;
