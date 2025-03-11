
import React, { useState } from "react";
import { Camera, Mic, Quote, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="p-4 border-t border-[#333333]">
      <form onSubmit={handleSendMessage} className="flex items-center">
        <Button type="button" variant="ghost" size="icon">
          <Camera size={24} />
        </Button>
        <div className="flex-1 mx-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Diga algo..."
            className="bg-[#222222] border-none rounded-full text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputMessage.trim()) {
                handleSendMessage(e);
              }
            }}
          />
        </div>
        <Button type="button" variant="ghost" size="icon" className="mx-1">
          <Mic size={24} />
        </Button>
        {inputMessage.trim() ? (
          <Button type="submit" variant="ghost" size="icon">
            <Send size={24} />
          </Button>
        ) : (
          <Button type="button" variant="ghost" size="icon">
            <Quote size={24} />
          </Button>
        )}
      </form>
    </div>
  );
};
