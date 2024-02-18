"use client";
import React from "react";
import { Camera, PenLine } from "lucide-react";
type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const InfoUserModal: React.FC<propTypes> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center 
    transition-colors ${open ? "visible bg-black/20" : "invisible"}
    z-30`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 w-full
        transition-all max-w-md 
        ${open ? "scale-100 opacity-100" : "scale-110 opacitiy-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header_InfoUserModal flex w-full pb-4">
          <h3 className="font-bold">Thông tin tài khoản</h3>
          <button
            className="absolute top-5 right-4 py-1 px-2 
              border border-neutral-200 rounded-md text-gray-400
              bg-white hover:bg-gray-50 hover:text-gray-600"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <img
          src="https://res-zalo.zadn.vn/upload/media/2019/9/23/2_1569228369739_53127.jpg"
          alt="Thumnail User"
          className="h-40 w-full object-cover"
        />
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <div className="flex items-center">
          <div className="Avatar relative inline-block">
            <img
              src="https://github.com/shadcn.png"
              alt="Avatar"
              className="size-16 rounded-full m-2"
            />
            <div className="absolute right-1 bottom-1 hover:bg-gray-200 rounded">
              <Camera />
            </div>
          </div>
          <h4 className="name text-sm mx-2">Công nghệ mới</h4>
          <div className="edit-icon hover:bg-gray-200 rounded">
            <PenLine size={12} />
          </div>
        </div>
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <div>
          <h4 className="my-2">Thông tin cá nhân</h4>
          <div className="text-sm">
            <div className="flex my-1">
              <span className="w-32">Giới tính</span>
              <p>Nam</p>
            </div>
            <div className="flex my-1">
              <span className="w-32">Ngày sinh</span>
              <p>01/01/2024</p>
            </div>
            <div className="flex my-1">
              <span className="w-32">Điện thoại</span>
              <p>0123456789</p>
            </div>
          </div>
        </div>
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <button
          type="button"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
        >
          Cập nhật
        </button>
        {children}
      </div>
    </div>
  );
};

export default InfoUserModal;
