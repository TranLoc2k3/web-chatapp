import React, { useEffect, useRef } from "react";

interface UnfriendModalsProps {
  onClose: () => void;
  ID: string; // Thêm prop ID
}

function UnfriendModals({ ID, onClose }: UnfriendModalsProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutSideClick = (e: MouseEvent) => {
    if(modalRef.current&&!modalRef.current.contains(e.target as Node)){
      onClose();
    }
  };
  const handleUnfriend = () => {
    // Thực hiện hành động xoá với ID được truyền vào
    console.log(`Xoá bạn với ID: ${ID}`);
    onClose();
  };
  useEffect(() => {
    document.addEventListener("mousedown",handleOutSideClick);
    return  ()=>{
      document.removeEventListener("mousedown",handleOutSideClick);
    }
    });
    return (
    <div className="fixed z-50">
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
            <button
              className="text-blue-500 hover:text-blue-700 p-2"
            
            >
              Xem thông tin
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UnfriendModals;
