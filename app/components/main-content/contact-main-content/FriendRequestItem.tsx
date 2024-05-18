import { userAPI } from "@/api/userAPI";
import { useBearStore } from "@/app/global-state/store";
import { convertISOToDDMMYYY } from "@/app/utils/datetimeUtils";
import Image from "next/image";
import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";

interface IProps {
  senderId: string;
  receiverId: string;
  avatar: string;
  fullname: string;
  sendedDate: string;
  id: string;
}

function FriendRequestItem({ avatar, fullname, sendedDate, id }: IProps) {
  const session = useSession();
  const { setCountFriendRequest, countFriendRequest } = useBearStore(
    (state) => ({
      setCountFriendRequest: state.setCountFriendRequest,
      countFriendRequest: state.countFriendRequest,
    })
  );
  const handleFriendRequest = async (type: string) => {
    const res = await userAPI.handleFriendRequest({ id, type });
    if (res.data.code === 1) {
      setCountFriendRequest(countFriendRequest - 1);
      // Lấy IDUser rồi emit
      // useSession();
      const IDUser = session.data?.token?.user;
      const payload = {
        IDUser: IDUser,
      };
      const payload1 = {
        IDUser: res.data.senderID,
      };
      console.log(res);
      socket.emit("load_conversations", payload);

      socket.emit("load_conversations", payload1);
    }
  };
  return (
    <div className="w-[400px] h-[240px] bg-slate-100 mt-6">
      <div className="flex gap-4 items-center pl-10 pr-10 pt-4 pb-4">
        <Image
          src={`${avatar}`}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-[500]">{fullname}</h3>
          <p className="text-sm text-[#7589A3] mt-1">
            {convertISOToDDMMYYY(sendedDate)}
          </p>
        </div>
      </div>
      <div className="mx-4 rounded-[6px] overflow-hidden">
        <p className="border-2 px-4 py-2 text-[15px]">{`Xin chào mình tên là ${fullname}. Kết bạn với mình nhé !`}</p>
      </div>
      <div className="flex space-x-4 p-4">
        <button
          onClick={() => handleFriendRequest("DENIED")}
          className="bg-slate-300 text-black w-full p-2 hover:bg-slate-400"
        >
          Từ chối
        </button>
        <button
          onClick={() => handleFriendRequest("ACCEPTED")}
          className="bg-blue-200 text-blue-500 w-full p-2 hover:bg-blue-300"
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
}

export default FriendRequestItem;
