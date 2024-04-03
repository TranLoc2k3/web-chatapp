/* eslint-disable @next/next/no-img-element */
"use client";

import { userAPI } from "@/api/userAPI";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { socket } from "@/configs/socket";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useBearStore } from "@/app/global-state/store";
interface AddFriendModalProps {
  isvisible: boolean;
  onClose: () => void;
}
const AddFriendModal: React.FC<AddFriendModalProps> = ({
  isvisible,
  onClose,
}) => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isHoverX, setIsHoverX] = useState(false);
  const userPhone = useBearStore((state) => state.userPhone);
  const { toast } = useToast();
  const handleFindUser = async () => {
    const res = await userAPI.getUserByPhone(`/user/get-user/${phone}`);
    setUser(res);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFindUser();
    }
  };

  const handleSendRequest = () => {
    if (!user) return;

    const payload = {
      senderId: userPhone,
      receiverId: user.ID,
    };
    socket.emit("new friend request client", payload);
    socket.on("send friend request server", (res: any) => {
      if (res?.code === 1) {
        toast({
          title: "Gửi lời mời kết bạn",
          description: "Đã gửi lời mời kết bạn thành công",
          duration: 2000,
          variant: "default",
        });
      } else if (res?.code === 0) {
        toast({
          title: "Gửi lời mời kết bạn",
          description: "Lời mời kết bạn đã được gửi trước đó",
          duration: 2000,
          variant: "default",
        });
      } else if (res?.code === 2) {
        toast({
          title: "Gửi lời mời kết bạn",
          description: "Đã có trong danh sách bạn bè",
          duration: 2000,
          variant: "default",
        });
      }
    });
    setPhone("");
    setUser(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isvisible && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          className="fixed inset-0 bg-black w-full bg-opacity-25 flex justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-white  h-[570px] w-[400px] mt-[50px]  rounded-sm border-b  relative">
              {/* phần 1 search sdt */}
              <div className="p-4 text-black border-b-2 relative">
                <h2>Thêm bạn</h2>
                <button className="absolute top-[20px] right-[20px]">
                  <X
                    onClick={() => {
                      setPhone("");
                      setUser(null);
                      onClose();
                    }}
                  />
                </button>
              </div>
              <div className="p-4 flex gap-3">
                <PhoneInput
                  inputClass="flex-1 !w-full"
                  country={"vn"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  onKeyDown={onKeyDown}
                />
                <Button
                  onClick={handleFindUser}
                  variant="outline"
                  className="h-[35px]"
                >
                  Tìm kiếm
                </Button>
              </div>
              {/* phần 2 kết quả gần nhất*/}
              {user && (
                <div className=" text-black ">
                  <p className="pl-4 pt-2 text-neutral-600 text-[12px]">
                    Kết quả
                  </p>
                  {/*  danh sách người kết bạn */}

                  <div
                    className={cn(
                      "p-4 pt-2 pb-2 flex mt-2 text-[12px] relative hover:bg-slate-200 w-full rounded-lg cursor-pointer "
                    )}
                    onMouseEnter={() => setIsHoverX(true)}
                    onMouseLeave={() => setIsHoverX(false)}
                  >
                    <Image
                      src={`${user.urlavatar}`}
                      width={40}
                      height={40}
                      className="rounded-full h-10"
                      alt=""
                    />
                    <div className="ml-3">
                      <h2 className="text-sm font-[500]">{`${user.fullname}`}</h2>
                      <p>{`+${phone}`}</p>
                    </div>
                    {isHoverX && (
                      <div className="absolute top-4 right-4 ">
                        <X className="w-5" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-4 text-black ">
                {/* <p className="pl-4 pt-2 text-neutral-600 text-[12px]">
                  Có thể bạn quen
                </p> */}
                {/* danh sách người kết bạn */}
                {/* <div>
                  <div className="p-4 pt-2 pb-2 flex mt-2 text-[12px]  hover:bg-slate-200 w-full rounded-lg  cursor-pointer">
                    <img
                      src="https://th.bing.com/th/id/OIP.6n5mkmpjmfQkoWvILfChPwHaJE?rs=1&pid=ImgDetMain"
                      className="w-8 h-w-8 rounded-full w-8 h-10"
                    ></img>
                    <div className="ml-3">
                      <h2>Bố</h2>
                      <p>+84 0935974359</p>
                    </div>
                    <div className="flex items-center justify-end space-x-2 ml-auto">
                      <button className=" pl-4 pr-4 pt-1 pb-1 border-blue-600 border-2 text-blue-600  hover:bg-blue-100 rounded-xl">
                        Kết bạn
                      </button>
                      <X className="w-3" />
                    </div>
                  </div>
                </div> */}
              </div>
              {/* phần 3 footer */}
              <div className="mt-[100px] h-[80px] absolute bottom-0 left-0 right-0">
                <Separator className="w-full" />
                <button
                  className="bg-slate-200 rounded-sm pl-4 pr-4 pt-2 pb-2  text-neutral-500 absolute top-5 right-[130px] hover:bg-slate-300"
                  onClick={() => {
                    setPhone("");
                    setUser(null);
                    onClose();
                  }}
                >
                  Huỷ
                </button>
                <button
                  onClick={handleSendRequest}
                  className="rounded-sm pl-4 pr-4 pt-2 pb-2 bg-blue-600 hover:bg-blue-800 text-white absolute top-5 right-2 "
                >
                  Kết bạn
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Toaster />
    </AnimatePresence>
  );
};

export default AddFriendModal;
