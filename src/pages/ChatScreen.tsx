
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MoreVertical, Camera, Clock, Send, Mic, Image, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/useMessages";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

const ChatScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const messageData = location.state?.messageData || {};
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading, sendMessage } = useMessages(id || null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleGoBack = () => {
    navigate("/messages");
  };

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
    
    return () => {
      // Cleanup function not required here
    };
  }, [user]);

  if (!id) {
    return <div>No user selected</div>;
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
                alt={messageData.name || "User"} 
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
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            Nenhuma mensagem ainda. Comece a conversar!
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.sender_id === user?.id;
            const showDateSeparator = index === 0 || 
              new Date(msg.created_at).toDateString() !== 
              new Date(messages[index - 1].created_at).toDateString();
            
            const messageDate = new Date(msg.created_at);
            const formattedDate = new Intl.DateTimeFormat('pt-BR', {
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            }).format(messageDate);
            
            return (
              <div key={msg.id}>
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
                      {msg.content}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 flex items-center ${
                      isUser ? "justify-end" : "justify-start"
                    }`}>
                      {messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isUser && msg.read && (
                        <span className="ml-1">Entregue</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
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
