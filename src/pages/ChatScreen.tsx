
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMessages } from "@/hooks/useMessages";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { AdBanner } from "@/components/chat/AdBanner";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatFooter } from "@/components/chat/ChatFooter";

const ChatScreen = () => {
  const location = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const messageData = location.state?.messageData || {};
  const { messages, loading, sendMessage } = useMessages(id || null);

  // When user enters a chat, mark their online status
  useEffect(() => {
    if (user) {
      const updateOnlineStatus = async () => {
        await supabase
          .from('profiles')
          .update({ online: true })
          .eq('id', user.id);
      };
      
      updateOnlineStatus();
    }
  }, [user]);

  if (!id) {
    return <div>No user selected</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <ChatHeader 
        avatar={messageData.avatar}
        name={messageData.name}
      />

      <AdBanner />

      <ChatMessageList 
        messages={messages}
        loading={loading}
      />

      <ChatFooter onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatScreen;
