import Header from "@/app/components/main-content/contact-main-content/header/Header";
import { Contact, Contact2 } from "lucide-react";
function FriendList({ children }: { children: React.ReactNode }) {
    return ( 
        <div>
            <Header icon={<Contact2/> }title="Danh sách nhóm" />
            <div>
               <h1>Hello</h1>
            </div>
        </div>
     );
}

export default FriendList;