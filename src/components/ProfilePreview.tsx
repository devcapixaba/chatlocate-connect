
import { useState } from "react";
import { X, Ban, Star, MessageSquare, Camera, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ProfilePreviewProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    distance?: number;
    status?: string;
    online?: boolean;
    lastOnline?: string;
    height?: number;
  };
  onClose: () => void;
  onChat: () => void;
}

export const ProfilePreview = ({ user, onClose, onChat }: ProfilePreviewProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso!",
        duration: 3000,
      });
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputMessage.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header with time and icons */}
      <div className="w-full p-4 flex items-center justify-between absolute top-0 z-10">
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
        <div className="flex space-x-4">
          <button className="text-white">
            <Ban size={24} />
          </button>
          <button className="text-white">
            <Star size={24} />
          </button>
        </div>
      </div>

      {/* Profile image */}
      <div className="flex-1 overflow-hidden">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-16 pb-4 px-4">
        <div className="mb-3">
          <h1 className="text-white text-4xl font-bold">{user.name} {user.name.includes(" ") ? "" : user.id}</h1>
          <div className="flex items-center text-gray-300 mt-2 text-sm">
            <span>{user.online ? "Online agora" : `Online ${user.lastOnline || "10 horas atrás"}`}</span>
            <span className="mx-2">•</span>
            <span>{user.distance ? `${user.distance} m de distância` : "917 m de distância"}</span>
          </div>
          <div className="text-gray-300 mt-1 flex items-center text-sm">
            <span>{user.height ? `${user.height} cm` : "179 cm"}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 mt-4">
          <div className="flex-1">
            <Input 
              placeholder="Digite algo..."
              className="bg-[#333333] border-none text-white h-12 rounded-full"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {inputMessage.trim() ? (
            <Button 
              onClick={handleSendMessage}
              variant="ghost"
              size="icon"
              className="bg-[#333333] text-yellow-500 rounded-full h-12 w-12"
            >
              <Send size={24} />
            </Button>
          ) : (
            <Button 
              variant="ghost"
              size="icon"
              className="bg-[#333333] text-yellow-500 rounded-full h-12 w-12"
            >
              <Camera size={24} />
            </Button>
          )}
          <Button 
            onClick={onChat}
            variant="ghost"
            size="icon"
            className="bg-[#333333] text-yellow-500 rounded-full h-12 w-12"
          >
            <MessageSquare size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};
