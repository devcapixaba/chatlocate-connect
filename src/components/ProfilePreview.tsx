
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { User } from "@/hooks/useHomeScreen";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { ProfileImage } from "./profile/ProfileImage";
import { ProfileInfo } from "./profile/ProfileInfo";
import { MessageComposer } from "./profile/MessageComposer";

interface ProfilePreviewProps {
  user: User;
  onClose: () => void;
  onChat: () => void;
}

export const ProfilePreview = ({ user, onClose, onChat }: ProfilePreviewProps) => {
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const handleSendMessage = async (message: string) => {
    if (!currentUser) return;
    
    try {
      setSending(true);
      console.log("Sending message:", {
        sender_id: currentUser.id,
        receiver_id: user.id,
        content: message,
      });
      
      // Insert the message in the database
      const { data, error } = await supabase.from('messages').insert([{
        sender_id: currentUser.id,
        receiver_id: user.id,
        content: message,
        read: false
      }]).select();

      if (error) {
        console.error("Error sending message:", error);
        throw error;
      }

      console.log("Message sent successfully:", data);
      
      toast({
        title: "Mensagem enviada",
        description: `Sua mensagem foi enviada para ${user.name}`,
      });
      
      // Navigate to messages after sending
      navigate(`/messages/${user.id}`);
    } catch (error: any) {
      console.error("Error in handleSendMessage:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleMessageClick = () => {
    navigate(`/messages/${user.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/90 flex flex-col">
      <ProfileImage 
        src={user.avatar} 
        alt={user.name} 
        onClose={onClose} 
      />
      
      {/* User info */}
      <div className="bg-black p-4 space-y-4">
        <ProfileInfo 
          name={user.name}
          isOnline={!!user.online}
          lastOnline={user.lastOnline}
          distance={user.distance}
          status={user.status}
        />
        
        <MessageComposer 
          onSendMessage={handleSendMessage}
          onMessageClick={handleMessageClick}
          isSending={sending}
        />
      </div>
    </div>
  );
};
