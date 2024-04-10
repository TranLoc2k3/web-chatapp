import { userAPI } from "@/api/userAPI";
import MessageItem from "./MessageItem";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { set } from "date-fns";
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
  const username = useSession().data?.token?.user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAPI.getFriendListByUserID(username);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        return
      }
    };
    fetchData();
  }, [username]);
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
