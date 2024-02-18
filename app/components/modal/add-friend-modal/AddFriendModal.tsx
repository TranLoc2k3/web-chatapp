"use client";

import { Phone, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface AddFriendModalProps {
  isvisible: boolean;
  onClose: () => void;
}
const AddFriendModal: React.FC<AddFriendModalProps> = ({
  isvisible,
  onClose,
}) => {
  const [phone, setPhone] = useState("");
  const [isHoverX, setIsHoverX] = useState(false);

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
                  <X onClick={() => onClose()} />
                </button>
              </div>
              <div className="p-4 flex">
                <Phone className="mr-2 w-4" />
                <input
                  placeholder="Nhập tên nhóm"
                  className="text-[14px] text-black border-b-[1px] w-full pb-2"
                ></input>
              </div>
              {/* phần 2 kết quả gần nhất*/}
              <div className=" text-black ">
                <p className="pl-4 pt-2 text-neutral-600 text-[12px]">
                  Kết quả gần nhất
                </p>
                {/*  danh sách người kết bạn */}

                <div
                  className="p-4 pt-2 pb-2 flex mt-2 text-[12px] relative hover:bg-slate-200 w-full rounded-lg cursor-pointer "
                  onMouseEnter={() => setIsHoverX(true)}
                  onMouseLeave={() => setIsHoverX(false)}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.6n5mkmpjmfQkoWvILfChPwHaJE?rs=1&pid=ImgDetMain"
                    className="w-8 h-w-8 rounded-full w-8 h-10"
                  ></img>
                  <div className="ml-3">
                    <h2>Bố</h2>
                    <p>+84 0935974359</p>
                  </div>
                  {isHoverX && (
                    <div className="absolute top-4 right-4 ">
                      <X className="w-5" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-black ">
                <p className="pl-4 pt-2 text-neutral-600 text-[12px]">
                  Có thể bạn quen
                </p>
                {/* danh sách người kết bạn */}
                <div>
                  {/* 1 */}
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
                  {/* 2 */}
                </div>
              </div>
              {/* phần 3 footer */}

              <div className="mt-[100px] h-[80px]  border-t-[1px]  border-blue-200 absolute bottom-0 left-0 right-0">
                <button
                  className="bg-slate-200 rounded-sm pl-4 pr-4 pt-2 pb-2  text-neutral-500 absolute top-5 right-[130px] hover:bg-slate-300"
                  onClick={() => onClose()}
                >
                  Huỷ
                </button>
                <button className="rounded-sm pl-4 pr-4 pt-2 pb-2 bg-blue-600 hover:bg-blue-800 text-white absolute top-5 right-2 ">
                  Kết bạn
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddFriendModal;
