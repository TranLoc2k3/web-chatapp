/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ThreeDot } from "@/app/components/icons/ThreeDot";
import { useBearStore } from "@/app/global-state/store";
import { UserProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosClient } from "@/configs/axios.config";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContentLayout from "./ContentLayout";
import { socket } from "@/configs/socket";

interface MemberButtonProps {
  title: string;
  urlavatar: string;
  currentConversation: any;
  memberId: string;
  currentUserID: string;
  isOwner: boolean;
  isCoOwner: boolean;
}

// Current user là người đang đăng nhập
const DropdownMenuByPosition = ({
  isOwner,
  isCoOwner,
  currentUserPosition,
  memberId,
}: {
  isOwner?: boolean;
  isCoOwner?: boolean;
  currentUserPosition?: string;
  memberId: string;
}) => {
  const IDConversation = usePathname().split("/")[3];
  const currentUserID = useSession().data?.token.user;

  const onCreateCoOwner = async (IDCoOwner: string) => {
    try {
      const res = await axiosClient.post("conversation/addCoOwnerToGroup", {
        IDConversation,
        IDCoOwner,
      });
      if (res.data === "Success") {
        socket.emit("load_member_of_group", { IDConversation });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onRemoveCoOwner = async (IDCoOwner: string) => {
    try {
      const res = await axiosClient.post(
        "conversation/removeCoOwnerFromGroup",
        {
          IDConversation,
          IDCoOwner,
        }
      );
      if (res.data === "Success") {
        socket.emit("load_member_of_group", { IDConversation });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onRemoveAnotherMember = async (removeUserId: string) => {
    socket.emit("remove_member_from_group", {
      IDConversation,
      IDUser: currentUserID,
      groupMembers: [removeUserId],
    });
  };
  const onDeleteGroup = async () => {
    socket.emit("delete_group", {
      IDConversation,
      IDUser: currentUserID,
    });
  };
  if (currentUserPosition === "owner") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="hover:bg-[rgba(0,0,0,0.1)] rounded-[4px] size-8 flex justify-center items-center">
            <ThreeDot />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute top-0 right-0 min-w-[200px]">
          {isOwner ? (
            <DropdownMenuItem onClick={onDeleteGroup}>
              Xóa nhóm
            </DropdownMenuItem>
          ) : isCoOwner ? (
            <>
              <DropdownMenuItem onClick={() => onRemoveCoOwner(memberId)}>
                Gỡ quyền phó nhóm
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRemoveAnotherMember(memberId)}>
                Xóa khỏi nhóm
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => onCreateCoOwner(memberId)}>
                Cấp quyền phó nhóm
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRemoveAnotherMember(memberId)}>
                Xóa khỏi nhóm
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (currentUserPosition === "co-owner" && !isOwner) {
    if (currentUserID !== memberId && isCoOwner) return null;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="hover:bg-[rgba(0,0,0,0.1)] rounded-[4px] size-8 flex justify-center items-center">
            <ThreeDot />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute top-0 right-0">
          {isCoOwner ? (
            <DropdownMenuItem>Rời nhóm</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => onRemoveAnotherMember(memberId)}>
              Xóa khỏi nhóm
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

const MemberButton = ({
  memberId,
  title,
  urlavatar,
  isOwner,
  isCoOwner,
  currentConversation,
  currentUserID,
}: MemberButtonProps) => {
  const IDConversation = usePathname().split("/")[3];
  const router = useRouter();
  const onLeaveGroup = async (IDSender: string) => {
    try {
      const res = await axiosClient.post("conversation/leave-group", {
        IDConversation,
        IDSender,
      });
      if (res.data === "Success") {
        socket.emit("load_conversations", { IDUser: currentUserID });
        socket.emit("load_member_of_group", { IDConversation });
        router.push("/dashboard/messages");
      }
    } catch (e) {}
  };
  const currentUserPosition =
    currentConversation.rules.IDOwner === currentUserID
      ? "owner"
      : currentConversation.rules.listIDCoOwner.includes(currentUserID)
      ? "co-owner"
      : "member";

  return (
    <div className="flex justify-between px-4 h-12 items-center hover:bg-[#f3f5f6] cursor-pointer w-full">
      <div className="flex gap-3 items-center flex-1">
        <Image
          src={urlavatar}
          alt=""
          width={40}
          height={40}
          className="size-8 rounded-full"
        />
        <div className="flex items-center justify-between flex-1">
          <p className="flex flex-col">
            <span className={cn("text-[#081C36] text-sm font-[500]")}>
              {title}
            </span>
            <span className={cn("text-[13px] text-[#7589a3]")}>
              {isOwner ? "Trưởng nhóm" : isCoOwner ? "Phó nhóm" : ""}
            </span>
          </p>

          {/* {currentUserID === memberId && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="hover:bg-[rgba(0,0,0,0.1)] rounded-[4px] size-8 flex justify-center items-center">
                  <ThreeDot />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute top-0 right-0">
                <DropdownMenuItem>Rời nhóm</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )} */}
          {currentUserPosition !== "member" ? (
            <DropdownMenuByPosition
              memberId={memberId}
              currentUserPosition={currentUserPosition}
              isCoOwner={isCoOwner}
              isOwner={isOwner}
            />
          ) : (
            currentUserID === memberId && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="hover:bg-[rgba(0,0,0,0.1)] rounded-[4px] size-8 flex justify-center items-center">
                    <ThreeDot />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute top-0 right-0">
                  <DropdownMenuItem onClick={() => onLeaveGroup(memberId)}>
                    Rời nhóm
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </div>
      </div>
    </div>
  );
};

function GroupMember() {
  const IDConversation = usePathname().split("/")[3];
  const [members, setMembers] = useState<UserProps[]>([]);
  const IDSender = useSession().data?.token.user;
  const currentConversation = useBearStore((state) =>
    state.conversations.find(
      (conversation: any) => conversation.IDConversation === IDConversation
    )
  );
  const router = useRouter();
  const openChildModalConversationInfo = useBearStore(
    (state) => state.openChildModalConversationInfo
  );
  const { setMemberInfoCurrentGroupConversation } = useBearStore((state) => ({
    setMemberInfoCurrentGroupConversation:
      state.setMemberInfoCurrentGroupConversation,
  }));
  const { setOpenMemberGroup, conversations } = useBearStore((state) => ({
    setOpenMemberGroup: state.setOpenAddMemberGroup,
    conversations: state.conversations,
  }));
  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axiosClient.post("/conversation/get-member-info", {
          IDConversation,
          IDSender,
        });
        setMembers(res.data);

        setMemberInfoCurrentGroupConversation(res.data);
      } catch (err) {
        router.push("/dashboard/messages");
      }
    };
    IDSender && getMembers();
    socket.on("load_member_of_group_server", (data) => {
      getMembers();
    });
  }, [IDSender, conversations]);

  return (
    openChildModalConversationInfo.member && (
      <ContentLayout title="Thành viên">
        <Button
          onClick={setOpenMemberGroup}
          variant="outline"
          className="my-4 w-full h-8 bg-[#EAEDF0] hover:bg-[#DFE2E7]"
        >
          Thêm thành viên
        </Button>
        {members &&
          members.length > 0 &&
          members.map((member) => (
            <MemberButton
              currentUserID={IDSender}
              memberId={member.ID}
              title={member.fullname}
              urlavatar={member.urlavatar}
              key={member.ID}
              currentConversation={currentConversation}
              isOwner={member.isOwner as boolean}
              isCoOwner={member.isCoOwner as boolean}
            />
          ))}
      </ContentLayout>
    )
  );
}

export default GroupMember;
