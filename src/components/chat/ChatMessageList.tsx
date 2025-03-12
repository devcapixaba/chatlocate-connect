
import { useRef, useEffect } from "react";
import { Message } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { MessageItem } from "./MessageItem";

interface ChatMessageListProps {
  messages: Message[];
  loading: boolean;
}

export const ChatMessageList = ({ messages, loading }: ChatMessageListProps) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Nenhuma mensagem ainda. Comece a conversar!
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <MessageItem 
          key={msg.id} 
          message={msg} 
          prevMessage={index > 0 ? messages[index - 1] : undefined} 
          user={user}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
