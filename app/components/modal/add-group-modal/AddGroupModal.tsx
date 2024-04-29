/* eslint-disable @next/next/no-img-element */
"use client";

import { UserProps } from "@/app/types";
import { Label } from "@/components/ui/label";
import { axiosClient } from "@/configs/axios.config";
import { socket } from "@/configs/socket";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FriendItem from "./components/friend-item/FriendItem";
import { toLowerCaseNonAccentVietnamese } from "@/app/utils/toLowerCaseNonAccentVietnamese";

interface AddGroupModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isvisible,
  onClose,
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const username = useSession().data?.token.user;
  const [query, setQuery] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [groupData, setGroupData] = useState<any>({
    IDOwner: "",
    groupName: "",
    groupMembers: [],
    groupAvatar: file,
  });
  const [friendList, setFriendList] = useState<UserProps[]>([]);
  const [searchResult, setSearchResult] = useState<UserProps[]>([]);
  const handleCheck = (IDUser: string) => {
    const index = friendList.findIndex((friend) => friend.ID === IDUser);

    if (index !== -1) {
      setCheckedItems((prev) => {
        const newCheckedItems = [...prev];
        newCheckedItems[index] = !newCheckedItems[index];

        return newCheckedItems;
      });
    }
  };

  const onCreateGroup = () => {
    const selectFriends = friendList.filter(
      (_, index) => checkedItems[index] === true
    );
    const listIdFriends = selectFriends.map((item) => item.ID);
    const payload = {
      ...groupData,
      groupMembers: [username, ...listIdFriends],
      groupAvatar: file,
      IDOwner: username,
    };
    socket.emit("create_group_conversation", payload);
    setFile(null);
    setGroupData({
      IDOwner: "",
      groupName: "",
      groupMembers: [],
      groupAvatar: null,
    });
    setQuery("");
    onClose();
  };

  const onSearch = (e: any) => {
    const result = friendList.filter((item) =>
      toLowerCaseNonAccentVietnamese(item.fullname).includes(
        toLowerCaseNonAccentVietnamese(e.target.value)
      )
    );
    setSearchResult(result);
    setQuery(e.target.value);
  };

  useEffect(() => {
    const getFriendList = async () => {
      const res = await axiosClient.post("conversation/get-list-friend", {
        username,
      });
      setFriendList(res.data);
      setSearchResult(res.data);
      setCheckedItems(new Array(res.data.length).fill(false));
    };
    username && getFriendList();
  }, [username]);

  return (
    <AnimatePresence>
      {isvisible && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          className="fixed inset-0 bg-black w-full bg-opacity-25 flex justify-center z-[1000]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-white h-[98%] w-[600px] mt-[5px] rounded-sm border-b relative z-50">
              {/*Phần 1 Header */}
              <div className="p-4 text-black border-b-2 relative">
                <h2>Tạo nhóm</h2>
                <button className="absolute top-[20px] right-[20px]">
                  <X onClick={() => onClose()} />
                </button>
              </div>
              {/* Phần 2 Content */}
              <div className="p-4">
                {/* 1 Nhập tên nhóm */}
                <div className="flex align-middle">
                  <div className="p-2 border-2 rounded-full opacity-80">
                    <Label htmlFor="avatar-group">
                      <Camera className="cursor-pointer" />
                    </Label>
                    <input
                      type="file"
                      hidden
                      id="avatar-group"
                      name="avatar-group"
                      onChange={(e) =>
                        e.target.files && setFile(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="flex align-middle ml-2 w-full">
                    <input
                      value={groupData.groupName}
                      onChange={(e) =>
                        setGroupData({
                          ...groupData,
                          groupName: e.target.value,
                        })
                      }
                      placeholder="Nhập tên nhóm"
                      className="text-[14px] text-black border-b-[1px] w-full"
                    />
                  </div>
                </div>
                {/*2 tìm số điện thoại bạn bè */}
                <div>
                  <div className="mt-4 border-[1px] border-neutral-300 p-1 rounded-3xl flex">
                    <Search className="opacity-50 ml-2" width="15px" />
                    <input
                      className="ml-2 w-full text-[12px]"
                      placeholder="Nhập tên hoặc số điện thoại"
                      value={query}
                      onChange={onSearch}
                    />
                  </div>
                </div>
                {/* 3 Chọn member để tạo nhóm */}
                <div className="pt-2 text-black  border-t-2 mt-2">
                  <div className="flex">
                    <div className="w-full">
                      <div>
                        <p className="pl-4 pt-2 text-neutral-600 text-[14px]">
                          Danh sách bạn bè
                        </p>
                      </div>
                      {searchResult.map((item: UserProps, index: number) => (
                        <FriendItem
                          key={item.ID}
                          item={item}
                          isChecked={
                            checkedItems[
                              friendList.findIndex(
                                (friend) => friend.ID === item.ID
                              )
                            ]
                          }
                          handleCheck={() => {
                            handleCheck(item.ID);
                          }}
                        />
                      ))}
                    </div>
                    {/* them vao nhom */}
                    {/* <AnimatePresence>
                      {selectFriends.length > 0 && (
                        <motion.div
                          initial={{ x: 0 }} // Bắt đầu từ vị trí bên phải ngoài
                          animate={{ x: 0 }} // Di chuyển đến vị trí trung tâm
                          exit={{ x: 0 }} // Ra khỏi màn hình về bên phải ngoài
                          transition={{ duration: 0.5 }} // Thời gian di chuyển
                          className="w-[300px] h-[380px] border-2 p-3 ml-2 mr-2 z-10"
                        >
                          <div>
                            <div className="flex text-[13px] ">
                              <div>Đã chọn</div>
                              <p className="ml-3 bg-blue-100 text-blue-600 pl-1 pr-1 rounded-2xl">
                                {selectFriends.length}/100
                              </p>
                            </div>
                            <div className="flex flex-col">
                              {selectFriends.map((friend) => (
                                <div
                                  key={friend.id}
                                  className="flex items-center text-[13px] bg-blue-100 mt-2 rounded-xl pl-2 pr-2 pt-1 pb-1"
                                >
                                  <img
                                    className="rounded-full w-4"
                                    src={friend.imageUrl}
                                    alt=""
                                  />
                                  <p className="ml-2">{friend.name}</p>

                                  <XCircle
                                    className="text-blue-500 ml-auto w-4"
                                    onClick={() => {
                                      handleRemoveFriend(friend.id);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence> */}
                  </div>
                </div>
              </div>

              {/* phần 3 footer */}
              <div className=" h-[60px]  border-t-[1px]  absolute  bottom-0 left-0 right-0 bg-white">
                <button
                  className="bg-slate-200 rounded-sm pl-4 pr-4 pt-1 pb-1  text-neutral-500 absolute top-4 right-[130px] hover:bg-slate-300"
                  onClick={() => onClose()}
                >
                  Huỷ
                </button>
                <button
                  onClick={onCreateGroup}
                  className="rounded-sm pl-4 pr-4 pt-1 pb-1 bg-blue-600 hover:bg-blue-800 text-white absolute top-4 right-2 "
                >
                  Tạo nhóm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddGroupModal;
