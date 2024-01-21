import { CheckSquare2, Contact2, MessageSquareText } from "lucide-react";
import MainTabItem from "./MainTabItem";

const sidebarTopItem = [
  {
    title: "messages",
    icon: <MessageSquareText color="#FFF" width={28} height={28} />,
  },
  {
    title: "contact",
    icon: <Contact2 color="#FFF" width={28} height={28} />,
  },
  {
    title: "todo",
    icon: <CheckSquare2 color="#FFF" width={28} height={28} />,
  },
];
function MainTabList() {
  return (
    <div>
      <div className="*:flex *:justify-center *:items-center *:h-16 hover:*:bg-[rgba(0,0,0,0.1)] *:cursor-pointer">
        {sidebarTopItem.map((item) => (
          <MainTabItem key={item.title} icon={item.icon} href={item.title} />
        ))}
      </div>
    </div>
  );
}

export default MainTabList;
