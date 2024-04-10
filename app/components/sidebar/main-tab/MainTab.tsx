"use client";
import { userAPI } from "@/api/userAPI";
import { useBearStore } from "@/app/global-state/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { socket } from "@/configs/socket";
import { cn } from "@/lib/utils";
import { Cloud, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoUserModal from "../../modal/InfoUserModal";
import SettingModal from "../../modal/SettingModal";
import MainTabList from "./MainTabList";

function MainTab() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);


  const session = useSession();
  const setCountFriendRequest = useBearStore(
    (state) => state.setCountFriendRequest
  );
  const { user, setUser } = useBearStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);
  const [data, setData] = useState<any>(null);

  function handleProfileClick() {
    setOpen(true);
  }
  function handleSettingClick() {
    setOpenSetting(true);
  }
  useEffect(() => {
    const getUser = async () => {
      const res = await userAPI.getUserByPhone(
        `/user/get-user/${session.data?.token.user}`
      );
      setData(res);
    };
    session.data?.token.user && getUser();
    const getAllFriendRequests = async () => {
      try {
        const res = await userAPI.getAllFriendRequests(
          `/user/get-all-friend-requests/${session.data?.token?.user}`
        );
        if (res) {
          setCountFriendRequest(res.length);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getAllFriendRequests();
    session.data?.token?.user &&
      socket.emit("new user connect", {
        phone: session.data?.token?.user,
      });
    socket.on("new friend request server", (data) => {
      if (data.code === 1) {
        setCountFriendRequest(countFriendRequest + 1);
      }
    });
    return () => {
      socket.off("new friend request server");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.token?.user]);

  useEffect(() => {
    setUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (session.status === "loading") return null;
  if (!data) return null;
  return (
    <div className="w-16 min-w-16 pt-8 bg-[#0091ff] h-dvh flex flex-col justify-between">
      <ScrollArea className="h-full">
        <div className="mb-8">
          <Avatar className="size-12 mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={`${user?.urlavatar || data.urlavatar}`}
                  key="u-avt-side-bar"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 rounded-full"
                  priority
                />
                <AvatarFallback>CN</AvatarFallback>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-[68px] mt-[-30px] w-[300px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingClick}>
                  Setting
                </DropdownMenuItem>
                <DropdownMenuItem className="border-t-2 mt-2"
                  onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                >
                  Đăng xuất
                </DropdownMenuItem>
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
        <InfoUserModal  open={open} onClose={() => setOpen(false)} />
     
      )}
      {data &&
        <SettingModal  open={openSetting} onClose={() => setOpenSetting(false)} >
          <></>
        </SettingModal>
      }
    </div>
  );
}

export default MainTab;
