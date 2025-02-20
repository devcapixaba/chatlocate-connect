
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface UserCardProps {
  user: {
    name: string;
    avatar: string;
    distance: number;
    status: string;
  };
  onChat: () => void;
}

export const UserCard = ({ user, onChat }: UserCardProps) => {
  return (
    <div className="glass-card p-4 rounded-lg animate-slide-up">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <img src={user.avatar} alt={user.name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.distance}km away</p>
        </div>
        <Button
          onClick={onChat}
          className="bg-primary hover:bg-primary/90 text-white"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </div>
      <p className="mt-2 text-sm text-gray-600">{user.status}</p>
    </div>
  );
};
