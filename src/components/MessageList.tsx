
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { EmptyConversations } from "./conversation/EmptyConversations";
import { ConversationList } from "./conversation/ConversationList";
import { AdBanner } from "./conversation/AdBanner";

interface Conversation {
  id: string;
  avatar: string;
  name: string;
  message: string;
  time: string;
  unread?: boolean;
}

export const MessageList = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      try {
        setLoading(true);

        // Get the latest message from each conversation
        const { data: messages, error } = await supabase
          .rpc('get_latest_messages', { current_user_id: user.id })
          .select();

        if (error) {
          console.error('Error fetching conversations:', error);
          return;
        }
        
        // Default empty array if no data
        const messageList = messages || [];
        
        // Get user profiles for each conversation partner
        const conversationPartnerIds = messageList.map((msg: any) => 
          msg.sender_id === user.id ? msg.receiver_id : msg.sender_id
        );
        
        if (conversationPartnerIds.length === 0) {
          setConversations([]);
          setLoading(false);
          return;
        }

        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name, avatar')
          .in('id', conversationPartnerIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          return;
        }

        // Format conversations
        const formattedConversations = messageList.map((msg: any) => {
          const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
          const partner = profiles.find((p: any) => p.id === partnerId) || { name: 'Unknown', avatar: null };
          
          // Format time
          const msgDate = new Date(msg.created_at);
          const now = new Date();
          const diff = now.getTime() - msgDate.getTime();
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          
          let timeText;
          if (days === 0) {
            // Today - show hours
            timeText = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          } else if (days === 1) {
            timeText = 'Yesterday';
          } else if (days < 7) {
            timeText = `${days}d ago`;
          } else {
            // More than a week - show date
            timeText = msgDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
          }
          
          return {
            id: partnerId,
            avatar: partner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partner.name}`,
            name: partner.name || 'Unknown',
            message: msg.sender_id === user.id ? `→ ${msg.content}` : msg.content,
            time: timeText,
            unread: !msg.read && msg.receiver_id === user.id,
          };
        });

        setConversations(formattedConversations);
      } catch (error) {
        console.error('Error in fetchConversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Subscribe to new messages
    const channel = supabase
      .channel('messages-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        },
        () => {
          fetchConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${user.id}`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (conversations.length === 0) {
    return <EmptyConversations />;
  }

  return (
    <div>
      <ConversationList conversations={conversations} />
      <AdBanner />
    </div>
  );
};
