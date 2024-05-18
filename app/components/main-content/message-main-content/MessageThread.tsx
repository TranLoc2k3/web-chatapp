"use client";

import { useBearStore } from "@/app/global-state/store";
import { MessageItemProps } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosClient } from "@/configs/axios.config";
import { socket } from "@/configs/socket";
import {
  UIEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MessageItem, { MessageItemLoading } from "./message/MessageItem";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { userAPI } from "@/api/userAPI";
import { Loader2 } from "lucide-react";

export default function MessageThread() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const refMessageList = useRef<HTMLDivElement>(null);
  const [IDNextBucket, setIDNextBucket] = useState("");
  const [messageList, setMessageList] = useState<MessageItemProps[]>([]);
  const [sendingCount, setSendingCount] = useState(0);
  const [isLoadingOldMessage, setIsLoadingOldMessage] = useState(false);
  const [scrollToKey, setScrollToKey] = useState<string>("");
  const messageItemrefs = useRef<Record<string, any>>({});
  const username = useSession().data?.token?.user;
  const pathname = usePathname();
  const { conversations, setConversations } = useBearStore((state) => ({
    conversations: state.conversations,
    setConversations: state.setConversations,
  }));

  const onScrollTop = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const fetchOld = async (e: UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollTop === 0) {
          if (IDNextBucket === "") return;
          setIsLoadingOldMessage(true);
          const res = await axiosClient.post("/conversation/getMessageDetail", {
            IDConversation: pathname.split("/")[3],
            IDNextBucket,
          });
          const currentOldestID = messageList
            ? messageList[messageList.length - 1].IDMessageDetail
            : "";

          setIDNextBucket(res.data.IDNextBucket);
          setMessageList((pre) => [...pre, ...res.data.listMessageDetail]);
          setScrollToKey(currentOldestID);
          setIsLoadingOldMessage(false);
        }
      };

      fetchOld(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [IDNextBucket]
  );
  useLayoutEffect(() => {
    if (
      scrollToKey === undefined ||
      (scrollRef.current as HTMLDivElement).scrollTop !== 0
    )
      return;
    messageItemrefs.current[scrollToKey] &&
      messageItemrefs.current[scrollToKey].scrollIntoView();
  }, [scrollToKey]);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [sendingCount, messageList]);

  useEffect(() => {
    const getMessageDetails = async () => {
      const res = await axiosClient.post("/conversation/getMessageDetail", {
        IDConversation: pathname.split("/")[3],
      });
      setIDNextBucket(res.data.IDNextBucket);
      setMessageList(res.data.listMessageDetail);
    };
    getMessageDetails();
  }, [pathname]);

  useEffect(() => {
    socket.on("sending_message", (data: any) => {
      setSendingCount(data);
    });
    socket.on("receive_message", async (data: any) => {
      socket.emit("load_conversations", { IDUser: username });
      const currentConversations = pathname.split("/")[3];

      const userSender = await userAPI.getUserByPhone(
        `user/get-user/${data.IDSender}`
      );
      data.userSender = userSender;
      data.IDConversation === currentConversations &&
        setMessageList((pre) => [data as MessageItemProps, ...pre]);
      setSendingCount(0);
    });
    return () => {
      // BAD: this will remove all listeners for the 'foo' event, which may
      // include the ones registered in another component
      socket.off("receive_message");
      socket.off("sending_message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="overflow-y-auto h-full flex-1">
      <ScrollArea
        ref={scrollRef}
        onScroll={onScrollTop}
        className="size-full [&>div:nth-child(2)>div:first-child]:h-full"
      >
        {isLoadingOldMessage && (
          <div className="flex justify-center items-center animate-spin">
            <Loader2 />
          </div>
        )}
        <div ref={refMessageList} className="h-full py-3 flex flex-col-reverse">
          {Array(sendingCount)
            .fill(0)
            .map((item, index) => (
              <MessageItemLoading key={index} />
            ))}
          {messageList &&
            messageList.map((item) => (
              <MessageItem
                ref={(el: HTMLDivElement) =>
                  (messageItemrefs.current[item.IDMessageDetail] = el)
                }
                message={item}
                key={item.IDMessageDetail}
              />
            ))}
        </div>
        <div ref={ref} className="pb-2" />
      </ScrollArea>
    </div>
  );
}
