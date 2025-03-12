
import { ConversationItem } from "./ConversationItem";

interface Conversation {
  id: string;
  avatar: string;
  name: string;
  message: string;
  time: string;
  unread?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
}

export const ConversationList = ({ conversations }: ConversationListProps) => {
  return (
    <div className="divide-y divide-[#333333]">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};
