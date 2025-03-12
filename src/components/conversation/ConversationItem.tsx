
import { useNavigate } from "react-router-dom";

interface ConversationItemProps {
  conversation: {
    id: string;
    avatar: string;
    name: string;
    message: string;
    time: string;
    unread?: boolean;
  };
}

export const ConversationItem = ({ conversation }: ConversationItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/messages/${conversation.id}`, { 
      state: { 
        messageData: conversation 
      } 
    });
  };

  return (
    <div 
      className="flex items-center p-4 cursor-pointer hover:bg-[#111111]"
      onClick={handleClick}
    >
      <div className="w-14 h-14 rounded-md overflow-hidden mr-3 flex-shrink-0">
        <img
          src={conversation.avatar}
          alt={conversation.name || "User"}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium text-white">
            {conversation.name || "Anonymous"}
          </span>
          <span className="text-gray-500 text-sm">
            {conversation.time}
          </span>
        </div>
        
        {conversation.message && (
          <p className="text-gray-400 truncate text-sm mt-1">
            {conversation.message}
          </p>
        )}
      </div>
    </div>
  );
};
