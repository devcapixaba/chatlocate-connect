
import { useState, useEffect, useCallback } from 'react';
import { supabase, Message } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export function useMessages(receiverId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!user || !receiverId) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${receiverId},receiver_id.eq.${receiverId}`)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      
      setMessages(data as Message[]);
      
      // Mark messages as read
      const unreadMessages = data.filter(
        (msg) => msg.receiver_id === user.id && !msg.read
      );
      
      if (unreadMessages.length > 0) {
        const messageIds = unreadMessages.map((msg) => msg.id);
        await supabase
          .from('messages')
          .update({ read: true })
          .in('id', messageIds);
      }
    } catch (error) {
      console.error('Error in fetchMessages:', error);
    } finally {
      setLoading(false);
    }
  }, [user, receiverId]);
  
  // Send a message
  const sendMessage = async (content: string) => {
    if (!user || !receiverId || !content.trim()) return;
    
    try {
      const newMessage = {
        sender_id: user.id,
        receiver_id: receiverId,
        content,
      };
      
      const { error } = await supabase.from('messages').insert([newMessage]);
      
      if (error) {
        toast({
          title: 'Erro ao enviar mensagem',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao enviar mensagem',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  // Listen for real-time updates
  useEffect(() => {
    if (!user) return;
    
    fetchMessages();
    
    const channel = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${user.id},receiver_id=eq.${receiverId}`,
        },
        () => {
          fetchMessages();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${receiverId},receiver_id=eq.${user.id}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, receiverId, fetchMessages]);
  
  return { messages, loading, sendMessage };
}
