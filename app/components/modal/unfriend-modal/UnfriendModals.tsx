import { userAPI } from "@/api/userAPI";
import { useBearStore } from "@/app/global-state/store";
import { axiosClient } from "@/configs/axios.config";
import { socket } from "@/configs/socket";
import axios from "axios";
import { set } from "date-fns";
import { da, is, se, tr } from "date-fns/locale";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import { boolean } from "zod";

interface UnfriendModalsProps {
  onClose: () => void;
  ID: string; // Thêm prop ID
}
interface Conversation {
  IDConversation: string;
  IDNewestMessage: string;
  IDReceiver: string;
  IDSender: string;
  groupMembers: string[];
  isBlock: boolean;
  isGroup: boolean;
  lastChange: string;
  listFile: string[];
  listImage: string[];
}
let IDConversation1: string;
function UnfriendModals({ ID, onClose }: UnfriendModalsProps) {
  const socket = io("http://localhost:8080");

  const [conversationBlock, setConversationBlock] = useState<
    Conversation | any
  >(); // Thêm state conversationBlock
  const { isOpenBlockFriend, setIsOpenBlockFriend } = useBearStore(
    (state) => state
  );
  const user = useSession().data?.token?.user;
  const modalRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const userID: string = user;
  const friendID: string = ID;
  const IDSender = user;
  const IDReceiver = ID;

  const handleOutSideClick = (e: MouseEvent) => {
    // mousedown ra thoát modal
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosClient.post(
          "/conversation/get-conversation-by-user-friend",
          {
            IDSender: user,
            IDReceiver: ID,
          }
        );

        // Kiểm tra nếu response có dữ liệu và có tồn tại IDConversation
        if (response) {
          const { IDConversation } = response.data;
          // Sử dụng IDConversation ở đây cho mục đích của bạn
          IDConversation1 = IDConversation;
          console.log("IDConversation:", IDConversation1);
        } else {
          console.log("IDConversation not found in response data");
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, [IDSender, IDReceiver]);
  console.log("IDConversation1:", IDConversation1);

  const handleUnfriend = async () => {
    try {
      const senderId: string = user;
      const receiverId: string = ID;
      const requestAPI = await axiosClient.post("/user/unfriend", {
        senderId,
        receiverId,
      });
      console.log(`Unfriend ${ID}`);
      toast.success("Đã huỷ kết bạn");
      if (requestAPI.data.message == "Unfriend successfully") {
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      return;
    }

    // onClose();
  };
  const handleBlockFriend = async () => {
    try {
      socket.emit("block_friend", { IDConversation1, IDSender, IDReceiver });
      setIsOpenBlockFriend(true);
    
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      return error;
    }
  };
  const handleUnBlockFriend = async () => {
    try {
      socket.emit("un_block_friend", { IDConversation1, IDSender, IDReceiver });
      setIsOpenBlockFriend(false);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      return error;
    }
  };
  useEffect(() => {
    socket.emit("get_block_friend", { IDConversation1, IDSender, IDReceiver });
  }, []);
  useEffect(() => {
    socket.on("get_block_friend_server", (data) => {
      if (data == true) {
        setIsOpenBlockFriend(true);
      } else {
        setIsOpenBlockFriend(false);
      }
    });
  },[]);

  useEffect(() => {
    socket.on("un_block_friend_server", (data) => {
      setIsOpenBlockFriend(false);
      if(data == "Unblock successful"){
        toast.success("Đã bỏ chặn bạn");
      }
    });
  }, [socket, setIsOpenBlockFriend]);
  useEffect(() => {
    socket.on("block_friend_server", (data) => {
  if(data == "Block successful"){
    toast.success("Đã chặn bạn");
  }
      setIsOpenBlockFriend(true);
    });
  }, [socket, setIsOpenBlockFriend]);
  
  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  });
  return (
    <div className="fixed z-50">
      <div id="recaptcha-container"></div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="border-x-2 border-y-2 p-4" ref={modalRef}>
        <ul className="space-y-2">
          <li>
            <button className="text-blue-500 hover:text-blue-700 p-2">
              Xem thông tin
            </button>
          </li>
          <li>
            {isOpenBlockFriend ? (
              <button
                className="text-blue-500 hover:text-blue-700 p-2"
                onClick={handleUnBlockFriend}
              >
                Bỏ chặn
              </button>
            ) : (
              <button
                className="text-red-500 hover:text-red-700 p-2"
                onClick={handleBlockFriend}
              >
                Chặn bạn
              </button>
            )}
          </li>
          <li>
            <button
              className="text-red-500 hover:text-red-700 p-2"
              onClick={handleUnfriend}
            >
              Huỷ kết bạn
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UnfriendModals;
