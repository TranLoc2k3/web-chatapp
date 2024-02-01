import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  BellOff,
  Pin,
  PinOff,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";

interface IProps {
  // isOpenNotify: boolean,
  // isConversationPinned: boolean
}

const HeaderButton = ({
  title,
  onClick,
  activeIcon,
  nonActiveIcon,
  isActive = false,
}: {
  title: string;
  activeIcon?: React.ReactNode;
  nonActiveIcon?: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-1 gap-2">
      <Button
        variant="icon"
        className={cn(
          "rounded-[50%]",
          `${isActive ? "bg-[#e5efff] hover:bg-[#e5efff]" : "bg-[#eaedf0]"}`
        )}
        size="icon"
        onClick={onClick}
      >
        {isActive ? nonActiveIcon : activeIcon}
      </Button>
      <span className="text-[#7589A3] text-[11.5px] text-center">{title}</span>
    </div>
  );
};
function ConversationInfoButton() {
  const [activeState, setActiveState] = useState({
    isOpenNotify: false,
    isConversationPinned: false,
  });
  const handleOpenNotify = () => {
    setActiveState((pre) => ({
      ...pre,
      isOpenNotify: !pre.isOpenNotify,
    }));
  };
  const handlePinnedConversation = () => {
    setActiveState((pre) => ({
      ...pre,
      isConversationPinned: !pre.isConversationPinned,
    }));
  };
  return (
    <div className="flex pt-3 *:flex-1">
      <HeaderButton
        title={`${
          activeState.isOpenNotify ? "Bật thông báo" : "Tắt thông báo"
        }`}
        isActive={activeState.isOpenNotify}
        activeIcon={<Bell width={20} height={20} strokeWidth={1.5} />}
        nonActiveIcon={
          <BellOff color="#005ae0" width={20} height={20} strokeWidth={1.5} />
        }
        onClick={handleOpenNotify}
      />
      <HeaderButton
        title={`${
          activeState.isConversationPinned
            ? "Bỏ ghim hội thoại"
            : "Ghim hội thoại"
        }`}
        onClick={handlePinnedConversation}
        isActive={activeState.isConversationPinned}
        nonActiveIcon={
          <PinOff color="#005ae0" width={20} height={20} strokeWidth={1.5} />
        }
        activeIcon={<Pin width={20} height={20} strokeWidth={1.5} />}
      />
      <HeaderButton
        title="Thêm thành viên"
        activeIcon={
          <UserRoundPlus
            className="relative left-[1.5px]"
            width={20}
            height={20}
            strokeWidth={1.5}
          />
        }
        onClick={() => {}}
      />
      <HeaderButton
        title="Quản lý nhóm"
        activeIcon={<Settings width={20} height={20} strokeWidth={1.5} />}
        onClick={() => {}}
      />
    </div>
  );
}

export default ConversationInfoButton;
