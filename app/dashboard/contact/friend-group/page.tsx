import Header from "@/app/components/main-content/contact-main-content/header/Header";
import { Contact } from "lucide-react";
import FriendGroupContent from "@/app/components/main-content/contact-main-content/FriendGroupContent";
function FriendList({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header icon={<Contact />} title="Danh sách nhóm" />
      <div className="p-6">
        <FriendGroupContent />
      </div>
    </div>
  );
}

export default FriendList;
