"use client";
import { useBearStore } from "@/app/global-state/store";
import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";

function ButtonCollapse() {
  const { setOpenConversationInfo } = useBearStore();
  return (
    <Button onClick={setOpenConversationInfo} variant="icon" size="icon">
      <PanelsTopLeft color="#081c36" strokeWidth={1.5} width={20} height={20} />
    </Button>
  );
}

export default ButtonCollapse;
