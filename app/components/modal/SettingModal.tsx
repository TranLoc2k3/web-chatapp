"use client";
import React, { useState } from "react";
import {
  Camera,
  Clock,
  DoorClosedIcon,
  Lock,
  PenLine,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChangePassWordModal from "./setting-modal/ChangePasswordModal";
import GeneralModal from "./setting-modal/GeneralModal";
type Tab = {
  id: string;
  icon: JSX.Element;
  label: string;
};
const tabs: Tab[] = [
  {
    id: "general",
    icon: <Settings />,
    label: "Cài đặt Chung",
  },
  {
    id: "privacy",
    icon: <Lock />,
    label: "Đổi mật khẩu",
  },
];

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const InfoUserModal: React.FC<propTypes> = ({ open, onClose, children }) => {
  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ngăn chặn sự lan truyền của sự kiện
    e.stopPropagation();
  };
  const [toggeChangePassword, setToggeChangePassword] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("");
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 inset-0 flex  pt-[60px] pb-[60px] pl-[500px] items-center
    transition-colors ${open ? "visible bg-slate-800/20" : "invisible"}
    z-30`}
      onClick={onClose}
    >
      <div
        onClick={handleModalContentClick}
        className={`fixed top-0 left-0 right-0 bottom-0 inset-0 flex  pt-[60px] ml-[300px] pb-[60px]  
    }
    z-30`}
      >
        <div className="bg-neutral-50 p-4 border-r">
          <h1>Cài đặt</h1>
          <div className="flex w-[300px] mt-4 ">
            <div className="w-[100%]">
              <div className="">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className="cursor-pointer hover:bg-neutral-200 flex p-3"
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    {tab.icon}
                    <h2 className="ml-2">{tab.label}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
       
        <div className="bg-white w-[45%] relative pt-9 p-6">
        <div>
          {currentTab === "general" && <GeneralModal />}
          {currentTab === "privacy" && <ChangePassWordModal onClose={onClose}  />}
        </div>
          <X
            className="absolute right-2 top-2 hover:bg-slate-200  cursor-pointer "
            onClick={() => {
              setCurrentTab("");
              onClose();
            }}
          />
        </div>
       
      </div>
    </div>
  );
};

export default InfoUserModal;
