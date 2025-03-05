
import { Link } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";

interface BottomNavBarProps {
  activeTab?: string;
}

export const BottomNavBar = ({ activeTab = "explore" }: BottomNavBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-[#333333] flex items-center justify-around z-50">
      <Link to="/" className="flex flex-col items-center">
        <Star 
          size={26} 
          className={activeTab === "explore" ? "text-white" : "text-gray-500"} 
        />
      </Link>
      
      <Link to="/mask" className="flex flex-col items-center">
        <div className={`text-2xl ${activeTab === "mask" ? "text-yellow-500" : "text-yellow-500"}`}>
          😷
        </div>
      </Link>
      
      <Link to="/messages" className="flex flex-col items-center">
        <MessageSquare 
          size={26} 
          className={activeTab === "messages" ? "text-white" : "text-gray-500"} 
        />
      </Link>
      
      <Link to="/premium" className="flex flex-col items-center">
        <div className={`px-2 py-1 text-xs font-bold rounded ${activeTab === "premium" ? "bg-white text-black" : "bg-gray-700 text-white"}`}>
          XTRA
        </div>
      </Link>
    </div>
  );
};
