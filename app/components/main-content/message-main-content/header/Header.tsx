import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "./BackButton";
import HeaderBtns from "./HeaderBtns";
import { useBearStore } from "@/app/global-state/store";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ConversationItemProps } from "@/app/types";
import UpdateGroupInfoModal from "@/app/components/modal/update-group-info/UpdateGroupInfo";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const conversations: ConversationItemProps[] = useBearStore(
    (state) => state.conversations
  );
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const IDConversation = usePathname().split("/")[3];
  const senders = useBearStore((state) => state.senders);
  const currentConversation = conversations.find(
    (conversation: any) => conversation.IDConversation === IDConversation
  );
  const receiver = useMemo(() => {
    if (currentConversation?.isGroup) {
      return {
        fullname: currentConversation.groupName,
        urlavatar: currentConversation.groupAvatar,
      };
    }
    return (
      currentConversation &&
      senders.find(
        (sender: any) => sender.ID === currentConversation.IDReceiver
      )
    );
  }, [currentConversation, senders]);
console.log("bịp")
  console.log(currentConversation);
  if (!receiver) return null;

  return (
    <div className="flex h-[68px] px-4 items-center border-b border-slate-300">
      <div className="flex items-center flex-1 gap-3">
        <div className="md:hidden">
          <BackButton />
        </div>
        <div className="flex items-center justify-center">
          <Avatar className="size-12">
            <AvatarImage
              src={receiver.urlavatar}
              className="hover:cursor-pointer"
              onClick={openModal}
              alt="avatar"
            />
            <AvatarFallback>{receiver.fullname}</AvatarFallback>
          </Avatar>
          <div className="header-title pl-4">{receiver.fullname}</div>
        </div>
      </div>
      <HeaderBtns />
      {isModalOpen && (<UpdateGroupInfoModal openModal={openModal} closeModal={closeModal} currentConversation={currentConversation} />)}
    </div>
  );
}

export default Header;
