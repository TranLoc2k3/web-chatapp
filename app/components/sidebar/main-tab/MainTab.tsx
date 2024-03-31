"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Cloud, Divide, Settings } from "lucide-react";
import MainTabList from "./MainTabList";
import { useState } from "react";
import InfoUserModal from "../../modal/InfoUserModal";
import { userAPI } from "@/api/userAPI";

const phone = localStorage.getItem("phone");

function MainTab() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, error } = useSWR(
    `/user/get-user/${phone}`,
    userAPI.getUserByPhone
  );
  function handleProfileClick() {
    setOpen(true);
  }
  if (!data) return null;
  return (
    <div className="w-16 min-w-16 pt-8 bg-[#0091ff] h-dvh flex flex-col justify-between">
      <ScrollArea className="h-full">
        <div className="mb-8">
          <Avatar className="size-12 mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AvatarImage src={`${data.urlavatar}`} />
                <AvatarFallback>CN</AvatarFallback>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Avatar>
        </div>
        <MainTabList />
      </ScrollArea>

      <ul
        className={cn(
          "*:flex *:justify-center *:items-center *:h-16 hover:*:bg-[rgba(0,0,0,0.1)] *:cursor-pointer"
        )}
      >
        <li>
          <Cloud color="#FFF" width={28} height={28} />
        </li>
        <li>
          <Settings color="#FFF" width={28} height={28} />
        </li>
      </ul>
      {data && (
        <InfoUserModal user={data} open={open} onClose={() => setOpen(false)}>
          <></>
        </InfoUserModal>
      )}
    </div>
  );
}

export default MainTab;
