"use client";
import { useBearStore } from "@/app/global-state/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  icon: React.ReactNode;
  href: string;
}
function MainTabItem({ icon, href }: IProps) {
  const pathName = usePathname();
  const isActive = pathName.includes(href);
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);

  return (
    <Link
      className={cn("relative", isActive ? "bg-[#006edc]" : "")}
      href={`/dashboard/${href}`}
    >
      {icon}
      {href === "contact" && countFriendRequest > 0 && (
        <span className="absolute top-2 right-[12px] size-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
          {countFriendRequest}
        </span>
      )}
    </Link>
  );
}

export default MainTabItem;
