import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "./BackButton";
import HeaderBtns from "./HeaderBtns";

function Header() {
  return (
    <div className="flex h-[68px] px-4 items-center border-b border-slate-300">
      <div className="flex items-center flex-1 gap-3">
        <div className="md:hidden">
          <BackButton />
        </div>
        <div className="flex items-center justify-center">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="header-title pl-4">Công nghệ mới</div>
        </div>
      </div>
      <HeaderBtns />
      
    </div>
  );
}

export default Header;
