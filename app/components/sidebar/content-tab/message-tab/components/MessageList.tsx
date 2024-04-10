import { userAPI } from "@/api/userAPI";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";
import { socket } from "@/configs/socket";
interface User {
  ID: string;
  fullname: string;
  avatar: string;
}
interface MessageItemProps {
  searchTerm: string;
}
function ConversationList({ searchTerm }: MessageItemProps) {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // Gắn data vào message nha Quý, cái này để Quý gắn lại chứ tui chưa gắn
    // Chú ý là có thể không có thuộc tính MessageDetail trong data trả về trong lần đầu vì chưa có tin nhắn mới
    // Check có thì hiển thị tin nhắn đó danh sách cuộc hội thoại
    // socket.emit("load_conversations", { IDUser: "84355887042" })
    socket.emit("load_conversations", { IDUser: "84355887042" })
    socket.on("load_conversations_server", (data) => {
      // console.log("Running here")
      console.log(data);

    });
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://66090cbaa2a5dd477b1505d2.mockapi.io/getSearcUser"
    //     );
    //     const data: User[] = await response.json();
    //     setUsers(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
  }, []);
  // Search Filter by userID
  const filteredUsers = users.filter((user) => user.ID.includes(searchTerm));

  return (
    <div>
      {filteredUsers.map((user) => (
        <MessageItem key={user.ID} user={user} />
      ))}
    </div>
  );
}

export default ConversationList;
