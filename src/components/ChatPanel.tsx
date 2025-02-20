
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface ChatPanelProps {
  recipientName: string;
  onClose: () => void;
}

export const ChatPanel = ({ recipientName, onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="glass-card fixed bottom-4 right-4 w-80 h-96 rounded-lg flex flex-col animate-slide-up">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">{recipientName}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                message.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-primary text-white">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
