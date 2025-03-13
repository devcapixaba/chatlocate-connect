import React, { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MessageComposerProps {
  onSendMessage: (message: string) => Promise<void>;
  onMessageClick: () => void;
  isSending: boolean;
}

export const MessageComposer = ({ onSendMessage, onMessageClick, isSending }: MessageComposerProps) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await onSendMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Keep the message in the input if sending fails
    }
  };

  return (
    <div className="flex items-center space-x-2 pt-2">
      <div className="relative flex-1">
        <Input
          placeholder="Diga algo..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-[#333333] border-none text-white pr-12 h-12 rounded-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message.trim() && !isSending) {
              handleSend();
            }
          }}
          disabled={isSending}
        />
        {message.trim() && !isSending && (
          <button
            onClick={handleSend}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <Send size={20} className="text-yellow-500" />
          </button>
        )}
        {isSending && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-yellow-500 rounded-full"></div>
          </div>
        )}
      </div>
      
      <button 
        onClick={onMessageClick} 
        className="p-3 bg-[#333333] rounded-full"
        disabled={isSending}
      >
        <MessageSquare size={22} className="text-yellow-500" />
      </button>
    </div>
  );
};
