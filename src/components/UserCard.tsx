
interface UserCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    distance?: number;
    status?: string;
    online?: boolean;
    lastOnline?: string;
    height?: number;
  };
  onChat: () => void;
}

export const UserCard = ({ user, onChat }: UserCardProps) => {
  return (
    <div 
      className="relative aspect-square bg-[#222222] cursor-pointer overflow-hidden"
      onClick={onChat}
    >
      <img
        src={user.avatar}
        alt={user.name || "User"}
        className="w-full h-full object-cover"
      />
      
      {/* User name at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-sm font-medium truncate">{user.name}</p>
        
        {/* Distance if available */}
        {user.distance !== undefined && user.distance < 9000 && (
          <p className="text-white/70 text-xs">{user.distance} km</p>
        )}
      </div>
      
      {/* Online indicator */}
      {user.online && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
      )}
    </div>
  );
};
