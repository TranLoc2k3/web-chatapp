import { cn } from "@/lib/utils";
import ContentTab from "./content-tab/ContentTab";
import MainTab from "./main-tab/MainTab";

function Sidebar() {
  return (
    <div className={cn("flex bg-white flex-1", "md:flex-none")}>
      {/* Left Content */}
      <MainTab />
      <ContentTab />
    </div>
  );
}

export default Sidebar;
