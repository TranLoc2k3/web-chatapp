import { useEffect, useState } from "react";
import FriendRequestItem from "./FriendRequestItem";
import { userAPI } from "@/api/userAPI";
import { useBearStore } from "@/app/global-state/store";

function FriendRequestContent() {
  const countFriendRequest = useBearStore((state) => state.countFriendRequest);
  const [friendRequest, setFriendRequest] = useState<any>([]);
  const userPhone = useBearStore((state) => state.userPhone);
  // const userPhone = "84847911569";
  useEffect(() => {
    const getAllFriendRequests = async () => {
      const res = await userAPI.getAllFriendRequests(
        `/user/get-all-friend-requests/${userPhone}`
      );
      setFriendRequest(res);
    };
    getAllFriendRequests();
  }, [countFriendRequest, userPhone]);
  console.log("friendRequest");
  console.log(friendRequest);
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
