
import { UserCard } from "@/components/UserCard";
import { User, nearbyUsers } from "@/hooks/useHomeScreen";

interface UserGridProps {
  onUserSelect: (user: User) => void;
}

export const UserGrid = ({ onUserSelect }: UserGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-px mt-px">
      {nearbyUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onChat={() => onUserSelect(user)}
        />
      ))}
    </div>
  );
};
