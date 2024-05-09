"use client";
import { cn } from "@/lib/utils";
import ContentTab from "./content-tab/ContentTab";
import MainTab from "./main-tab/MainTab";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathName = usePathname();
  return (
    <div className={cn("flex bg-white flex-1", "md:flex-none")}>
      {/* Left Content */}
      <MainTab />
      {pathName !== "/dashboard/map" && <ContentTab />}
    </div>
  );
}

export default Sidebar;
