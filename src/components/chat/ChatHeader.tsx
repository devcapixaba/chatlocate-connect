
import { ArrowLeft, Image, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  avatar?: string;
  name?: string;
}

export const ChatHeader = ({ avatar, name }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/messages");
  };

  return (
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
              src={avatar} 
              alt={name || "User"} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex items-center">
            {name && (
              <span className="font-medium mr-2">{name}</span>
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
  );
};
