import Header from "@/app/components/main-content/ConTactMainContent/header/Header";
import { Contact } from "lucide-react";
function FriendList({ children }: { children: React.ReactNode }) {
    return ( 
        <div>
            <Header icon={<Contact/> }title="Danh sách bạn bè" />
            <div>
               <h1>Hello</h1>
            </div>
        </div>
     );
}

export default FriendList;