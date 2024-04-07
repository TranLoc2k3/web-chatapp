import { useRef, useState } from "react";
type propTypes = {
  
  onClose: () => void;
};
const ChangePassWordModal: React.FC<propTypes> = ({  onClose }) =>{
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const handleSearchClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };
  return (
    <div>
      <h1 className="text-[20px]">Tạo Mật khẩu mới</h1>
      <div className="p-4">
        <div className="mt-2">
          <span className="font-bold">Lưu ý </span>
          Mật khẩu bao gồm các số ký tự đặc biệt tối thiểu 8 ký tự trở lên
        </div>
        <div className="mt-4" onClick={() => handleSearchClick(currentPasswordRef)}>
          <span>Mật khẩu hiện tại </span>
          <div className="flex p-4 border-2 mt-4">
            <input
              ref={currentPasswordRef}
              type="password"
              className="w-full"
              placeholder="Mật khẩu hiện tại"
            />
          </div>
        </div>
        <div className="mt-4" onClick={() => handleSearchClick(newPasswordRef)}>
          <span>Mật khẩu mới </span>
          <div className="flex p-4 border-2 mt-4">
            <input
              ref={newPasswordRef}
              type="password"
              className="w-full"
              placeholder="Mật khẩu mới"
            />
          </div>
        </div>
        <div className="mt-4" onClick={() => handleSearchClick(confirmPasswordRef)}>
          <span>Nhập lại mật khẩu mới </span>
          <div className="flex p-4 border-2 mt-4">
            <input
              ref={confirmPasswordRef}
              type="password"
              className="w-full"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-8 mt-6">
        <button
          type="button"
          className="px-8 py-2 bg-slate-200 hover:bg-slate-300 rounded-md"
          onClick={onClose}
        >
          Huỷ
        </button>
        <button
          type="button"
          className="ml-4 px-8 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-white"
        >
          Cập nhât
        </button>
      </div>
    </div>
  );
}

export default ChangePassWordModal;
