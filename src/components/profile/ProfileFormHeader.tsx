
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileFormHeaderProps {
  loading: boolean;
}

const ProfileFormHeader = ({ loading }: ProfileFormHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-black p-4 border-b border-white/10 flex items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/profile')}
        disabled={loading}
      >
        <ArrowLeft size={24} />
      </Button>
      <h1 className="text-xl font-semibold ml-4">Editar Perfil</h1>
    </div>
  );
};

export default ProfileFormHeader;
