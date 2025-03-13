
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileFormActionsProps {
  loading: boolean;
  uploading: boolean;
}

const ProfileFormActions = ({ loading, uploading }: ProfileFormActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate('/profile')}
        className="mr-2"
        disabled={loading}
      >
        Cancelar
      </Button>
      <Button 
        type="submit" 
        disabled={loading || uploading}
        className="bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        {loading ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </span>
        ) : (
          "Salvar Alterações"
        )}
      </Button>
    </div>
  );
};

export default ProfileFormActions;
