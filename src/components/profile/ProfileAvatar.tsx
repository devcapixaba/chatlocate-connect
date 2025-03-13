
import { User } from "lucide-react";

interface ProfileAvatarProps {
  avatar: string | null | undefined;
  name: string;
}

const ProfileAvatar = ({ avatar, name }: ProfileAvatarProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-2">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User size={40} className="text-gray-400" />
        )}
      </div>
      <p className="text-sm text-gray-400">Foto de perfil</p>
    </div>
  );
};

export default ProfileAvatar;
