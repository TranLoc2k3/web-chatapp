import Header from "@/app/components/main-content/contact-main-content/header/Header";
import { Contact, Contact2 } from "lucide-react";
import FriendListContent from "@/app/components/main-content/contact-main-content/FriendListContent";
function FriendList({ children }: { children: React.ReactNode }) {
    return ( 
        <div>
            <Header icon={<Contact2/> }title="Danh sách nhóm" />
            <div className="p-6">
                <FriendListContent />
            </div>
        </div>
     );
}

export default FriendList;