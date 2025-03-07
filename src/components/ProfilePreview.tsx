
import React, { useState } from "react";
import { X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { User } from "@/hooks/useHomeScreen";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface ProfilePreviewProps {
  user: User;
  onClose: () => void;
  onChat: () => void;
}

export const ProfilePreview = ({ user, onClose, onChat }: ProfilePreviewProps) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const handleSendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    try {
      // Insert the message in the database
      const { error } = await supabase.from('messages').insert([{
        sender_id: currentUser.id,
        receiver_id: user.id,
        content: message,
        read: false
      }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Mensagem enviada",
        description: `Sua mensagem foi enviada para ${user.name}`,
      });
      setMessage("");
      
      // Navigate to messages after sending
      navigate(`/messages/${user.id}`);
    } catch (error: any) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleMessageClick = () => {
    navigate(`/messages/${user.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/90 flex flex-col">
      <div className="relative flex-1">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/60 rounded-full"
        >
          <X size={24} className="text-white" />
        </button>
        
        {/* User image */}
        <div className="h-full flex items-center justify-center">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="max-h-full object-contain"
          />
        </div>
      </div>
      
      {/* User info */}
      <div className="bg-black p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-white text-xl font-bold">{user.name}</h3>
          {user.online && (
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          {user.distance !== undefined && (
            <>
              <span>{user.distance}km</span>
              <span>•</span>
            </>
          )}
          <span>{user.online ? 'Online agora' : `Online ${user.lastOnline}`}</span>
        </div>
        
        <div className="text-white">{user.status}</div>
        
        {/* Message input and actions */}
        <div className="flex items-center space-x-2 pt-2">
          <div className="relative flex-1">
            <Input
              placeholder="Diga algo..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#333333] border-none text-white pr-12 h-12 rounded-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  handleSendMessage();
                }
              }}
            />
            {message.trim() && (
              <button
                onClick={handleSendMessage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Send size={20} className="text-yellow-500" />
              </button>
            )}
          </div>
          
          <button 
            onClick={handleMessageClick} 
            className="p-3 bg-[#333333] rounded-full"
          >
            <MessageSquare size={22} className="text-yellow-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
