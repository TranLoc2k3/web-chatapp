"use client";

import { useBearStore } from "@/app/global-state/store";
import { convertISOToDDMMYYY } from "@/app/utils/datetimeUtils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import EditProfile from "./EditProfileModal";
import { useState } from "react";
type propTypes = {
  open: boolean;
  onClose: () => void;
};
const InfoUserModal: React.FC<propTypes> = ({ open, onClose }) => {
  const user = useBearStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
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
          key="u-bg"
          src={user?.urlavatar}
          alt="Thumnail User"
          height={160}
          width={100}
          className="h-40 w-full object-cover"
          priority
        />
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <div className="flex items-center">
          <div className="Avatar relative inline-block">
            <Image
              key="u-avt"
              width={64}
              height={64}
              src={user?.urlavatar}
              alt="Avatar"
              className="size-16 rounded-full m-2"
              priority
            />
          </div>
          <h4 className="name mx-2 text-lg font-[600]">{user?.fullname}</h4>
        </div>
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <div>
          <h4 className="my-2 font-[600] text-base mb-2">Thông tin cá nhân</h4>
          <div className="text-sm">
            <div className="flex my-2 gap-3">
              <span className="flex-1 text-[#7589A3] font-[300]">
                Giới tính
              </span>
              <p className="flex-[3]">{user?.ismale ? "Nam" : "Nữ"}</p>
            </div>
            <div className="flex my-2 gap-3">
              <span className="flex-1 text-[#7589A3] font-[300]">
                Ngày sinh
              </span>
              <p className="flex-[3]">{convertISOToDDMMYYY(user?.birthday)}</p>
            </div>
            <div className="flex my-2 gap-3">
              <span className="flex-1 text-[#7589A3] font-[300]">
                Điện thoại
              </span>
              <p className="flex-[3]">{user?.phone.replace(/^84/, "0")}</p>
            </div>
          </div>
        </div>
        <span className="block w-full h-px bg-gray-400 my-3"></span>
        <div className="relative">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="w-full"
              >
                Cập nhật
              </Button>
            </DialogTrigger>
            {isOpen && (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cập nhật thông tin</DialogTitle>
                </DialogHeader>
                <EditProfile
                  setIsOpen={setIsOpen}
                  birthday={user?.birthday}
                  fullname={user?.fullname}
                  phone={user?.phone}
                  sex={user?.ismale}
                  urlavatar={user?.urlavatar}
                />
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default InfoUserModal;
