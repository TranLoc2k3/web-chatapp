import { UserRoundPlus, UsersRound } from "lucide-react";
import Search from "./components/Search";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import AddFriendModal from "@/app/components/modal/add-friend-modal/AddFriendModal";
import AddGroupModal from "@/app/components/modal/add-group-modal/AddGroupModal";

const MessageTabHeader: React.FC = () => {
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
  const [showAddGroup, setShowAddGroup] = useState<boolean>(false);
  return (
    <Fragment>
      <div className="h-16 px-4 flex items-center gap-4">
        <Search />
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="icon"
            onClick={() => setShowAddFriend(true)}
          >
            <UserRoundPlus width={20} height={20} strokeWidth={1.6} />
          </Button>
          <Button
            size="icon"
            variant="icon"
            onClick={() => setShowAddGroup(true)}
          >
            <UsersRound width={20} height={20} strokeWidth={1.6} />
          </Button>
        </div>
      </div>
      <AddFriendModal
        isvisible={showAddFriend}
        onClose={() => setShowAddFriend(false)}
      />
      <AddGroupModal
        isvisible={showAddGroup}
        onClose={() => setShowAddGroup(false)}
      />
    </Fragment>
  );
};

export default MessageTabHeader;
