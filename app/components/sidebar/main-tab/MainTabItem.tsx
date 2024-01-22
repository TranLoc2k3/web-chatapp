"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  icon: React.ReactNode;
  href: string;
}
function MainTabItem({ icon, href }: IProps) {
  const pathName = usePathname();
  const isActive = pathName.includes(href);
  return (
    <Link
      className={isActive ? "bg-[#006edc]" : ""}
      href={`/dashboard/${href}`}
    >
      {icon}
    </Link>
  );
}

export default MainTabItem;
