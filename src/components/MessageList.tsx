
import { MessageItem } from "@/components/MessageItem";

// Dummy data for messages
const messages = [
  {
    id: "1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous",
    name: "",
    message: "Album received",
    time: "13h ago",
    unread: true,
  },
  {
    id: "2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Danny",
    name: "Danny",
    message: "→ Eai gostosooo",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leo",
    name: "leoo",
    message: "→ 😢",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ninfetinh",
    name: "ninfetinh🍒",
    message: "→ Po gostoso, não me respond...",
    time: "4d ago",
    unread: false,
  },
  {
    id: "5",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thiago",
    name: "Thiago",
    message: "Oi",
    time: "4d ago",
    unread: false,
  },
  {
    id: "6",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    name: "Pedro",
    message: "",
    time: "22 May",
    unread: false,
  },
];

export const MessageList = () => {
  return (
    <div className="divide-y divide-[#333333]">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {/* Advertisement Banner */}
      <div className="w-full p-4">
        <div className="relative w-full h-16 bg-[#111111] rounded overflow-hidden">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
            AD
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black font-bold rounded px-3 py-1 text-sm">
            DOWNLOAD
          </div>
        </div>
      </div>
    </div>
  );
};
