import React from "react";

interface UnfriendModalsProps {
  onClose: () => void;
  ID: string; // Thêm prop ID
}

function UnfriendModals({ ID, onClose }: UnfriendModalsProps) {
  const handleUnfriend = () => {
    // Thực hiện hành động xoá với ID được truyền vào
    console.log(`Xoá bạn với ID: ${ID}`);
    onClose();
  };
  return (
    <div className="fixed ">
      <div className="bg-slate-200 p-4 ">
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
              onClick={() => {
         
                onClose();
              }}
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
