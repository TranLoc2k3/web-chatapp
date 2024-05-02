import { userAPI } from "@/api/userAPI";
import { axiosClient } from "@/configs/axios.config";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UnfriendModalsProps {
  onClose: () => void;
  ID: string; // Thêm prop ID
}

function UnfriendModals({ ID, onClose }: UnfriendModalsProps) {
  const user = useSession().data?.token?.user;
  const modalRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>(""); // Thêm state message
  const handleOutSideClick = (e: MouseEvent) => {
    // mousedown ra thoát modal
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  const handleUnfriend = async () => {
    
    try {
      const senderId: string = user;
      const receiverId: string = ID;
      const requestAPI = await axiosClient.post("/user/unfriend", {
        senderId,
        receiverId,
      });
      console.log(requestAPI);
      console.log(`Unfriend ${ID}`);
      toast.success("Đã huỷ kết bạn");
      if(requestAPI.data.message=="Unfriend successfully"){
        window.location.reload();
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      return;
    }

    // onClose();
  };
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
      <div className="bg-slate-200 p-4" ref={modalRef}>
        <ul className="space-y-2">
          <li>
            <button
              className="text-red-500 hover:text-red-700 p-2"
              onClick={handleUnfriend}
            >
              Huỷ kết bạn
            </button>
          </li>
          <li>
            <button className="text-blue-500 hover:text-blue-700 p-2">
              Xem thông tin
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UnfriendModals;
