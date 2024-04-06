import { useEffect, useState } from "react";
import FriendRequestItem from "./FriendRequestItem";
import { userAPI } from "@/api/userAPI";
import { useBearStore } from "@/app/global-state/store";
import { useSession } from "next-auth/react";

function FriendRequestContent() {
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);
  const [friendRequest, setFriendRequest] = useState<any>([]);
  const userPhone = useSession().data?.token?.user;
  const session = useSession()
  console.log(session);
  
  useEffect(() => {
    const getAllFriendRequests = async () => {
      const res = await userAPI.getAllFriendRequests(
        `/user/get-all-friend-requests/${session.data?.token?.user}`
      );
      setFriendRequest(res);
    };
    getAllFriendRequests();
  }, [countFriendRequest, session.data?.token?.user]);
  return (
    <div>
      <h2>{`Lời mời đã nhận (${countFriendRequest})`}</h2>
      {friendRequest.map((item: any) => (
        <FriendRequestItem
          id={item.id}
          key={item.id}
          receiverId={item.receiverId}
          senderId={item.senderId}
          avatar={item.sender.urlavatar}
          fullname={item.sender.fullname}
          sendedDate={item.createdAt}
        />
      ))}
    </div>
  );
}

export default FriendRequestContent;
