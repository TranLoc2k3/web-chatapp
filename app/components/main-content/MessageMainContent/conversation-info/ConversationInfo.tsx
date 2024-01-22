"use client";
import { useBearStore } from "@/app/global-state/store";
import { cn } from "@/lib/utils";

function ConversationInfo() {
  const state = useBearStore();
  const onClose = () => {
    state.setOpenConversationInfo();
  };

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0",
          `${state.isOpenConversationInfo ? "" : "hidden"}`
        )}
      />
      <div
        className={cn(
          "w-[344px] h-full shadow-[0_0_10px_rgba(0,0,0,0.25)] bg-white absolute top-0 right-0 z-10 transition duration-300",
          `${
            state.isOpenConversationInfo ? "translate-x-0" : "translate-x-full"
          }`
        )}
      >
        CONVERSATION INFO
      </div>
    </div>
  );
}

export default ConversationInfo;
