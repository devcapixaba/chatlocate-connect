
import { UserCard } from "@/components/UserCard";
import { User } from "@/hooks/useHomeScreen";

interface UserGridProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

export const UserGrid = ({ users, onUserSelect }: UserGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-px mt-px">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onChat={() => onUserSelect(user)}
        />
      ))}
    </div>
  );
};
