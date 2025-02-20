
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, X } from "lucide-react";
import { useState } from "react";

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

export const UserCard = ({ user, onChat, onSwipe }: UserCardProps) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = currentX - startX;
    setOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(offset) > 100) {
      onSwipe?.(offset > 0 ? 'right' : 'left');
    }
    setOffset(0);
  };

  return (
    <div
      className="relative mx-auto max-w-sm"
      style={{
        transform: `translateX(${offset}px) rotate(${offset * 0.05}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="glass-card overflow-hidden rounded-xl shadow-xl">
        <div className="relative h-96">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
            <p className="text-sm opacity-90">{user.distance}km away</p>
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="text-gray-600">{user.status}</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              onClick={() => onSwipe?.('left')}
              size="lg"
              variant="outline"
              className="rounded-full h-14 w-14 p-0"
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>
            <Button
              onClick={onChat}
              size="lg"
              variant="outline"
              className="rounded-full h-14 w-14 p-0"
            >
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </Button>
            <Button
              onClick={() => onSwipe?.('right')}
              size="lg"
              variant="outline"
              className="rounded-full h-14 w-14 p-0"
            >
              <Heart className="w-6 h-6 text-green-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
