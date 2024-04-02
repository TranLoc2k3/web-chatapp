import Header from "@/app/components/main-content/ConTactMainContent/header/Header";
import { Contact, Mail } from "lucide-react";
import FriendRequestContent from "@/app/components/main-content/ConTactMainContent/FriendRequestContent";
function FriendList({ children }: { children: React.ReactNode }) {
    return ( 
        <div>
            <Header icon={<Mail/> }title="Lời mời kết bạn" />
            <div className="p-6">
             <FriendRequestContent/>
            </div>
        </div>
     );
}

export default FriendList;