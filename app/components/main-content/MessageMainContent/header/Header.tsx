import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "./BackButton";
import ButtonCollapse from "./ButtonCollapse";

function Header() {
  return (
    <div className="flex h-[68px] px-4 items-center">
      <div className="flex items-center flex-1 gap-3">
        <div className="md:hidden">
          <BackButton />
        </div>
        <div>
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <ButtonCollapse />
    </div>
  );
}

export default Header;
