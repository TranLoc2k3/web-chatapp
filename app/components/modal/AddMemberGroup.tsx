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
import FriendItem from "./add-group-modal/components/friend-item/FriendItem";
import { usePathname } from "next/navigation";
import { useBearStore } from "@/app/global-state/store";
import { toLowerCaseNonAccentVietnamese } from "@/app/utils/toLowerCaseNonAccentVietnamese";

interface AddGroupModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const AddMemberGroup: React.FC<AddGroupModalProps> = ({
  isvisible,
  onClose,
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const username = useSession().data?.token.user;
  const [query, setQuery] = useState<string>("");
  const IDConversation = usePathname().split("/")[3];
  const [groupData, setGroupData] = useState<any>({
    IDConversation: IDConversation,
    IDUser: username,
    groupMembers: [],
  });
  const memberInfoCurrentGroupConversation = useBearStore(
    (state) => state.memberInfoCurrentGroupConversation
  );
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

  const onSearch = (e: any) => {
    const result = friendList.filter((item) =>
      toLowerCaseNonAccentVietnamese(item.fullname).includes(
        toLowerCaseNonAccentVietnamese(e.target.value)
      )
    );
    setSearchResult(result);
    setQuery(e.target.value);
  };
  const onAddMember = () => {
    const selectFriends = friendList.filter(
      (_, index) => checkedItems[index] === true
    );
    const listIDMemberToAdd = selectFriends.map((item) => item.ID);
    const payload = {
      ...groupData,
      groupMembers: listIDMemberToAdd,
    };

    socket.emit("add_member_to_group", payload);
    socket.emit("load_conversations", { IDUser: username });
    setGroupData({
      IDConversation: IDConversation,
      IDUser: username,
      groupMembers: [],
    });
    setQuery("");
    onClose();
  };

  useEffect(() => {
    const getFriendList = async () => {
      const res = await axiosClient.post("conversation/get-list-friend", {
        username,
      });
      res.data = res.data.filter((item: any) => {
        return memberInfoCurrentGroupConversation.every(
          (member: any) => member.ID !== item.ID
        );
      });

      setFriendList(res.data);
      setSearchResult(res.data);
      setCheckedItems(new Array(res.data.length).fill(false));
    };
    username && getFriendList();
  }, [username, memberInfoCurrentGroupConversation]);

  return (
    <div>
      <AnimatePresence>
        {isvisible && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            className="fixed inset-0 bg-black w-screen h-screen bg-opacity-25 flex justify-center z-[1000]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="bg-white h-[98%] w-[600px] mt-[5px]  rounded-sm border-b relative z-50">
                {/*Phần 1 Header */}
                <div className="p-4 text-black border-b-2 relative">
                  <h2>Thêm thành viên</h2>
                  <button className="absolute top-[20px] right-[20px]">
                    <X onClick={() => onClose()} />
                  </button>
                </div>
                {/* Phần 2 Content */}
                <div className="p-4">
                  {/*2 tìm số điện thoại bạn bè */}
                  <div>
                    <div className="mt-4 border-[1px] border-neutral-300 p-1 rounded-3xl flex">
                      <Search className="opacity-50 ml-2" width="15px" />
                      <input
                        className="ml-2 w-full text-[12px]"
                        placeholder="Nhập tên, số điện thoại"
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
                            Trò chuyện gần đây
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
                    onClick={onAddMember}
                    className="rounded-sm pl-4 pr-4 pt-1 pb-1 bg-blue-600 hover:bg-blue-800 text-white absolute top-4 right-2 "
                  >
                    Thêm thành viên
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddMemberGroup;
