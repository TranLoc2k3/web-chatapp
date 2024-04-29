import { userAPI } from "@/api/userAPI";
import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface UpdateGroupInfoModalProps {
  openModal: () => void;
  closeModal: () => void;
  currentConversation: {
    IDConversation: string;
    groupName: string;
    groupAvatar: File;
  };
}

function UpdateGroupInfoModal({
  openModal,
  closeModal,
  currentConversation,
}: UpdateGroupInfoModalProps): JSX.Element {
  const [groupName, setGroupName] = useState<string>(""); // State lưu trữ tên nhóm
  const [groupAvatar, setGroupAvatar] = useState<File | null>(null); // State lưu trữ avatar nhóm

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGroupAvatar(file);
    }
  };

  const createObjectURLSafely = (groupAvatar: File | null): string => {
    try {
      return groupAvatar ? URL.createObjectURL(groupAvatar) : currentConversation.groupAvatar;
    } catch (error) {
      console.error("Error creating object URL:", error);
      return "";
    }
  };

  const handleSave = async () => {
    try {
      if (!currentConversation.IDConversation || !groupName || !groupAvatar) {
        console.error("Missing required data");
        return;
      }

      const api = await userAPI.onUpdateGroupInfo(currentConversation.IDConversation, groupName, groupAvatar);
      console.log(api);
    } catch (error) {
      console.error("Error updating group info:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-4 z-50 h-[500px]  w-[400px] relative">
        <div className="relative border-b-2 h-[30px]">
          <h2 className="absolute ">Thông tin nhóm </h2>
          <X
            className="absolute right-6 hover:cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className=" mt-[50px] flex justify-center items-center">
          <div className=" relative">
            <img
              className="w-[150px] h-[150px] rounded-full "
              src={createObjectURLSafely(groupAvatar)}
              alt="abc"
            />
            <input
              type="file"
              onChange={handleAvatarChange}
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />
          </div>
        </div>
        <div className="border-2 p-2 mt-4">
          <input type="text" placeholder={currentConversation.groupName} onChange={handleGroupNameChange} />
        </div>
        <button
          onClick={handleSave}
          className="absolute bottom-4 right-5 bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}

export default UpdateGroupInfoModal;
