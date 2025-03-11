
import React from "react";
import { Message } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface MessageItemProps {
  message: Message;
  prevMessage?: Message;
  user: User | null;
}

export const MessageItem = ({ message, prevMessage, user }: MessageItemProps) => {
  const isUser = message.sender_id === user?.id;
  const showDateSeparator = !prevMessage || 
    new Date(message.created_at).toDateString() !== 
    new Date(prevMessage.created_at).toDateString();
  
  const messageDate = new Date(message.created_at);
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(messageDate);
  
  return (
    <div>
      {showDateSeparator && (
        <div className="text-center my-6 text-gray-500">
          {formattedDate}
        </div>
      )}
      
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div className="max-w-[70%]">
          <div className={`rounded-lg px-4 py-2 ${
            isUser ? "bg-yellow-500 text-black" : "bg-[#222222] text-white"
          }`}>
            {message.content}
          </div>
          <div className={`text-xs text-gray-500 mt-1 flex items-center ${
            isUser ? "justify-end" : "justify-start"
          }`}>
            {messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {isUser && message.read && (
              <span className="ml-1">Entregue</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
