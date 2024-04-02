import { MessageCircle } from "lucide-react";

function FriendRequestContent() {
  return (
    <div>
      <h2>Lời mời đã nhận</h2>
      <div className="w-[400px] h-[240px] bg-slate-100 mt-6">
        <div className="flex justify-between pl-10 pr-10 pt-4 pb-4">
          <img className="rounded-full w-10 h-10" src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/332777405_1855173591536079_3440609999613316095_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF3dFX70Remp2ZcL0BYvQxj46v_wv4kBVrjq__C_iQFWuz5heGQlqvZgsE_R6SjKS-ex0-Y2_Z9Si9F1uc-zRlS&_nc_ohc=jvv6n98yFXUAX9mx2nt&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDjY0FoujxDGlmDzwDmeqxeJRsOqllm-HAyptVHr_ctXA&oe=66113E7C" alt="" />
          <div>
            <h3>Trọng nghĩa</h3>
            <p className="ml-2">12/03-Từ nhóm trò chuyện</p>
          </div>
          <MessageCircle/>
        </div>
        <div className="border-2 p-4">
            <p>Xin chào mình tên là Nghĩ đến từ miền núi</p>
        </div>
        <div className="flex space-x-4 p-4">
            <button className="bg-slate-300 text-black w-full p-2 hover:bg-slate-400 ">Chấp nhận</button>
            <button className="bg-blue-200 text-blue-500 w-full p-2 hover:bg-blue-300">Từ chối</button>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestContent;
