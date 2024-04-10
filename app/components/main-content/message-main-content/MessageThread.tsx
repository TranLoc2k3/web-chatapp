"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./message/MessageItem";
import { useBearStore } from "@/app/global-state/store";
import { useEffect, useRef } from "react";

export default function MessageThread() {
  const msgList = useBearStore().msgList;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [msgList]);
  return (
    <div className="overflow-y-auto h-full flex-1">
      <ScrollArea className="size-full">
        <div className="h-full py-3">
          {msgList.map((item) => (
            <MessageItem message={item} key={item.idMessageDetail} />
          ))}
        </div>
        <div ref={ref} className="pb-2" />
      </ScrollArea>
    </div>
  );
}
