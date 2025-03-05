
import { useState } from "react";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MessageTab } from "@/components/MessageTab";
import { MessageList } from "@/components/MessageList";
import { Settings } from "lucide-react";

const Messages = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "taps" | "albums">("messages");

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black pt-4 px-4 border-b border-[#333333]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Inbox</h1>
          <div className="flex space-x-2">
            <Settings size={24} className="text-white" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#333333]">
          <MessageTab 
            label="Messages" 
            active={activeTab === "messages"} 
            onClick={() => setActiveTab("messages")} 
          />
          <MessageTab 
            label="Taps" 
            active={activeTab === "taps"} 
            onClick={() => setActiveTab("taps")} 
          />
          <MessageTab 
            label="Albums" 
            active={activeTab === "albums"} 
            onClick={() => setActiveTab("albums")} 
          />
        </div>
      </div>

      {/* Message list */}
      <MessageList />
      
      <BottomNavBar activeTab="messages" />
    </div>
  );
};

export default Messages;
