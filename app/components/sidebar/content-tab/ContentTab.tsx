"use client";

import { Separator } from "@/components/ui/separator";
import MessageTab from "./message-tab/MessageTab";
import { usePathname } from "next/navigation";
import ContactTab from "./ContactTab";
import MapTab from "./MapTab";
import { cn } from "@/lib/utils";

const data = [
  {
    title: "messages",
    component: <MessageTab />,
  },
  {
    title: "contact",
    component: <ContactTab />,
  },
  {
    title: "map",
    component: <MapTab />,
  }
];

function ContentTab() {
  const pathName = usePathname();
  const activeTab = data.find((item) => pathName.includes(item.title));

  return (
    <div className={cn("flex w-full h-dvh max-h-dvh", "md:w-[344px]")}>
      <div className="flex-1">{activeTab?.component}</div>
      <Separator
        className="h-full w-[1px] bg-[#d6dbe1]"
        orientation="vertical"
      />
    </div>
  );
}

export default ContentTab;
