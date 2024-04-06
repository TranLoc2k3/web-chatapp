"use client";
import { userAPI } from "@/api/userAPI";
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
import { cn } from "@/lib/utils";
import { Cloud, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import InfoUserModal from "../../modal/InfoUserModal";
import MainTabList from "./MainTabList";
import { socket } from "@/configs/socket";
import { useBearStore } from "@/app/global-state/store";
import { signOut, useSession } from "next-auth/react";

function MainTab() {
  const [open, setOpen] = useState<boolean>(false);
  const session = useSession();
  const setCountFriendRequest = useBearStore(
    (state) => state.setCountFriendRequest
  );
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);
  const { setUserPhone } = useBearStore((state) => ({
    setUserPhone: state.setUserPhone,
  }));
  
  const userPhone = useSession().data?.token?.user;
  const { data } = useSWR(
    `/user/get-user/${session.data?.token?.user}`,
    userAPI.getUserByPhone
  );

  function handleProfileClick() {
    setOpen(true);
  }
  useEffect(() => {
    setUserPhone(session.data?.token?.user);
    const getAllFriendRequests = async () => {
      const res = await userAPI.getAllFriendRequests(
        `/user/get-all-friend-requests/${session.data?.token?.user}`
      );
      if (res) {
        setCountFriendRequest(res.length);
      }
    };
    getAllFriendRequests();
    session.data?.token?.user && socket.emit("new user connect", {
      phone: session.data?.token?.user,
    });
    socket.on("new friend request server", (data) => {
      console.log(data);

      if (data.code === 1) {
        setCountFriendRequest(countFriendRequest + 1);
      }
    });
    return () => {
      socket.off("new friend request server");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.token?.user]);
  if (session.status === "loading") return null;
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
                <DropdownMenuItem
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
        <InfoUserModal user={data} open={open} onClose={() => setOpen(false)}>
          <></>
        </InfoUserModal>
      )}
    </div>
  );
}

export default MainTab;
