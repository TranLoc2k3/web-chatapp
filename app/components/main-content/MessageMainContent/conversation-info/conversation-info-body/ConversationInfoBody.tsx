import ConversationBoard from "./section/ConversationBoard";
import ConversationMember from "./section/ConversationMember";

function ConversationInfoBody() {
  return (
    <div>
      <ConversationMember memberList={[1, 2, 3, 4]} />
      <ConversationBoard />
    </div>
  );
}

export default ConversationInfoBody;
