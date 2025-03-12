
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const EmptyConversations = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8 px-4 text-center text-gray-500">
      <p>Você ainda não tem conversas</p>
      <p className="mt-2 text-sm">Comece a conversar com alguém na página principal</p>
      
      <Button 
        variant="outline" 
        className="mt-4 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
        onClick={() => navigate("/")}
      >
        Ir para página principal
      </Button>
    </div>
  );
};
