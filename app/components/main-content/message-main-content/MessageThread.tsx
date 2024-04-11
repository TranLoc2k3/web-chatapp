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

  const onScrollTop = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const fetchOld = async (e: UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollTop === 0) {
          if (IDNextBucket === "") return;
          setIsLoadingOldMessage(true);
          const res = await axiosClient.post("/conversation/getMessageDetail", {
            IDConversation: "8b6e5b23-298e-4c32-89df-3d65f112ad59",
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
  }, [sendingCount]);
  
  const pathname = usePathname()
  

  useEffect(() => {
    const getMessageDetails = async () => {
      const res = await axiosClient.post("/conversation/getMessageDetail", {
        IDConversation: pathname.split("/")[3],
      });
      setIDNextBucket(res.data.IDNextBucket);
      setMessageList(res.data.listMessageDetail);
    };
    getMessageDetails();
  }, []);

  useEffect(() => {
    socket.on("sending_message", (data: any) => {
      console.log(data);
      
      setSendingCount(data);
    });
    socket.on("receive_message", (data) => {
      setMessageList((pre) => [data as MessageItemProps, ...pre]);
      setSendingCount(0);
    });
    return () => {
      // BAD: this will remove all listeners for the 'foo' event, which may
      // include the ones registered in another component
      socket.off("receive_message");
      socket.off("sending_message");
    };
  }, []);

  return (
    <div className="overflow-y-auto h-full flex-1">
      <ScrollArea
        ref={scrollRef}
        onScroll={onScrollTop}
        className="size-full [&>div:nth-child(2)>div:first-child]:h-full"
      >
        {isLoadingOldMessage && (
          <div className="size-10 bg-red-400">LOADING...</div>
        )}
        <div ref={refMessageList} className="h-full py-3 flex flex-col-reverse">
          {Array(sendingCount)
            .fill(0)
            .map((item, index) => (
              <MessageItemLoading key={index} />
            ))}
          {messageList.map((item) => (
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
