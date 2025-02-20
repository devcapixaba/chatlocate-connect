
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
  onSwipe?: (direction: 'left' | 'right') => void;
}

export const UserCard = ({ user, onChat }: UserCardProps) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
        <h3 className="font-semibold text-white truncate">{user.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-300">{user.distance}km</p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onChat();
            }}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
