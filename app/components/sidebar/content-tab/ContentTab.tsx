"use client";
import { Separator } from "@/components/ui/separator";
import MessageTab from "./MessageTab";
import { usePathname } from "next/navigation";
import ContactTab from "./ContactTab";

const data = [
  {
    title: "messages",
    component: <MessageTab />,
  },
  {
    title: "contact",
    component: <ContactTab />,
  },
];

function ContentTab() {
  const pathName = usePathname();
  const activeTab = data.find((item) => pathName.includes(item.title));

  return (
    <div className="min-w-[344px] flex">
      <div className="flex-1 flex items-center justify-center">
        {activeTab?.component}
      </div>

      <Separator
        className="h-full w-[1px] bg-[#d6dbe1]"
        orientation="vertical"
      />
    </div>
  );
}

export default ContentTab;
