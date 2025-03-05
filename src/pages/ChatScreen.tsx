
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Camera, Clock, Send, Mic, Image, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  delivered?: boolean;
}

const ChatScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { messageData } = location.state || {};
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample messages based on the design
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Tu é chegado a beleza em",
      sender: "other",
      timestamp: "00:09",
    },
    {
      id: "2",
      text: "Foi mal a demora aí",
      sender: "other",
      timestamp: "00:29",
    },
    {
      id: "3",
      text: "Po",
      sender: "user",
      timestamp: "00:30",
      delivered: true,
    },
    {
      id: "4",
      text: "Oi*",
      sender: "user",
      timestamp: "00:30",
      delivered: true,
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      delivered: true
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleGoBack = () => {
    navigate("/messages");
  };

  if (!messageData) {
    return <div>No message data available</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#333333] bg-black">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleGoBack}
            className="mr-3"
          >
            <ArrowLeft size={24} />
          </Button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
              <img 
                src={messageData.avatar} 
                alt={messageData.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex items-center">
              {messageData.name && (
                <span className="font-medium mr-2">{messageData.name}</span>
              )}
              <span className="text-yellow-500">★</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon">
            <div className="relative">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <Image size={24} />
            </div>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical size={24} />
          </Button>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="w-full p-2 bg-yellow-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-black text-xl ml-2">XTRA</span>
            <span className="text-black ml-4">Obtém 600 perfis e muito mais</span>
          </div>
          <span className="text-white mr-2">✕</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          // Check if we need to show a date separator
          const showDateSeparator = 
            index === 0 || 
            index === 2;
          
          return (
            <div key={msg.id}>
              {showDateSeparator && (
                <div className="text-center my-6 text-gray-500">
                  {index === 0 ? "qua., 12 de fev." : "dom., 23 de fev."}
                </div>
              )}
              
              {/* Expiring photo message */}
              {index === 0 && (
                <div className="flex justify-center my-4">
                  <div className="bg-transparent border border-yellow-500 text-yellow-500 rounded-full py-2 px-4 flex items-center">
                    <Clock className="mr-2" size={20} />
                    <span>Foto que expira</span>
                  </div>
                </div>
              )}
              
              <div className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[70%]">
                  <div className={`rounded-lg px-4 py-2 ${
                    msg.sender === "user" ? "bg-yellow-500 text-black" : "bg-[#222222] text-white"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 flex items-center ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}>
                    {msg.timestamp}
                    {msg.delivered && msg.sender === "user" && (
                      <span className="ml-1">Entregue</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
    </div>
  );
};

export default ChatScreen;
