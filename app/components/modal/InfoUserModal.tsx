"use client";
import React from "react";
import { Camera, PenLine } from "lucide-react";
import Image from "next/image";
type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  user: any;
};
const InfoUserModal: React.FC<propTypes> = ({
  open,
  onClose,
  children,
  user,
}) => {
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
        <Image
          src={user?.urlavatar}
          alt="Thumnail User"
          height={160}
          width={100}
          className="h-40 w-full object-cover"
        />
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <div className="flex items-center">
          <div className="Avatar relative inline-block">
            <Image
              width={64}
              height={64}
              src={user?.urlavatar}
              alt="Avatar"
              className="size-16 rounded-full m-2"
            />
            <div className="absolute right-1 bottom-1 hover:bg-gray-200 rounded">
              <Camera />
            </div>
          </div>
          <h4 className="name text-sm mx-2">{user?.fullname}</h4>
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
              <p>{user?.ismale ? "Nam" : "Nữ"}</p>
            </div>
            <div className="flex my-1">
              <span className="w-32">Ngày sinh</span>
              <p>{user?.birthday}</p>
            </div>
            <div className="flex my-1">
              <span className="w-32">Điện thoại</span>
              <p>{user?.phone.replace(/^84/, "0")}</p>
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
