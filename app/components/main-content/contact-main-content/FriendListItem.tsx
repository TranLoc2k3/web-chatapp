import { CircleEllipsisIcon, DoorClosed, X } from "lucide-react";
import { useState } from "react";
import UnfriendModals from "../../modal/unfriend-modal/UnfriendModals";

interface IProps {
  avatar: string;
  fullName: string;
  ID: string;
}
function FriendListItem({ ID, avatar, fullName }: IProps) {
  const [isOpenUnFriendModal, setIsOpenUnFriendModal] =
    useState<boolean>(false);
  const openModal = () => {
    setIsOpenUnFriendModal(true);
  };
  const closeModal = () => {
    setIsOpenUnFriendModal(false);
  };
  const toggleModal = () => {
    setIsOpenUnFriendModal((prevState) => !prevState); // Đảo ngược trạng thái hiện tại của modal
  }
  return (
    <div>
      <div className="flex space-x-2 border-2 p-2 mt-3 hover:cursor-pointer hover:border-gray-400 justify-items-center space-x-[800px] relative">
        <div className="flex space-x-2 hover:cursor-pointer">
          <img src={avatar} alt="" className="rounded-full w-8 h-8" />
          <p>{fullName}</p>
        </div>
        <div className="absolute right-16" >
          <CircleEllipsisIcon onClick={toggleModal} className="text-red-400" />
          <div className="ml-[-150px] mt-10">
            {isOpenUnFriendModal && <UnfriendModals ID={ID} onClose={closeModal} />}
          </div>
        </div>
        {/* show modal */}
      </div>
    </div>
  );
}

export default FriendListItem;
