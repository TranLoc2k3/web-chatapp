import { UserRoundPlus, UsersRound } from "lucide-react";
import Search from "./components/Search";
import { Button } from "@/components/ui/button";

function MessageTabHeader() {
  return (
    <div className="h-16 px-4 flex items-center gap-4">
      <Search />
      <div className="flex gap-3">
        <Button size="icon" variant="icon">
          <UserRoundPlus width={20} height={20} strokeWidth={1.6} />
        </Button>
        <Button size="icon" variant="icon">
          <UsersRound width={20} height={20} strokeWidth={1.6} />
        </Button>
      </div>
    </div>
  );
}

export default MessageTabHeader;
