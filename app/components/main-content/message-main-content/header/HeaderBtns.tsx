import React from "react";
import ButtonCollapse from "./ButtonCollapse";
import { Video, Search, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBearStore } from "@/app/global-state/store";

function HeaderBtns() {
  const setOpenAddMemberGroup = useBearStore(
    (state) => state.setOpenAddMemberGroup
  );
  return (
    <div className="flex space-x-1">
      <Button onClick={setOpenAddMemberGroup} size="icon" variant="icon">
        <UserRoundPlus width={20} height={20} strokeWidth={1.6} />
      </Button>
      <Button size="icon" variant="icon">
        <Search width={20} height={20} strokeWidth={1.6} />
      </Button>
      <Button size="icon" variant="icon">
        <Video width={20} height={20} strokeWidth={1.6} />
      </Button>
      <ButtonCollapse />
    </div>
  );
}

export default HeaderBtns;
