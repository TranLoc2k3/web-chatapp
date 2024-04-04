import MessageItem from "./MessageItem";
import { useEffect, useState } from 'react';
interface User {
  ID: string;
  fullname: string;
  avatar: string;
}
interface MessageItemProps {
  searchTerm: string;
}
function MessageList({searchTerm}: MessageItemProps) {
  const [ users, setUsers ] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response= await fetch("https://66090cbaa2a5dd477b1505d2.mockapi.io/getSearcUser");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])
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

export default MessageList;
