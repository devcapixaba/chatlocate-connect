
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Zap, User, Image, Heart, Shield, Settings, ArrowRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
}

export const UserSidebar = ({ isOpen, onClose, username = "Novin" }: UserSidebarProps) => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(profile?.name || username);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSaveUsername = async () => {
    if (!user || !editedUsername.trim()) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({ name: editedUsername })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setIsEditing(false);
      
      toast({
        title: "Nome atualizado",
        description: "Seu nome foi atualizado com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar nome",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProfile = () => {
    onClose();
    navigate("/profile/edit");
  };

  const handleViewPremiumPlans = () => {
    onClose();
    navigate("/premium");
  };
  
  const handleViewAlbums = () => {
    onClose();
    navigate("/albums");
  };
  
  const handleViewSettings = () => {
    onClose();
    navigate("/settings");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70">
      <div className="w-[85%] h-full bg-black overflow-y-auto">
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Profile section */}
        <div className="px-4 flex flex-col items-center">
          <div className="w-32 h-32 bg-[#333333] rounded-lg mb-4 overflow-hidden">
            {profile?.avatar && (
              <img 
                src={profile.avatar} 
                alt={profile?.name || editedUsername} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {isEditing ? (
            <div className="w-full relative mb-6">
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="w-full py-2 px-4 bg-[#333333] text-white text-lg font-medium rounded-full text-center"
                autoFocus
                disabled={isSaving}
              />
              <button 
                onClick={handleSaveUsername}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                ) : (
                  <div className="p-1 bg-white rounded-full">
                    <X size={16} className="text-black" />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="w-full relative mb-6">
              <div className="w-full py-2 px-4 bg-[#333333] text-white text-lg font-medium rounded-full text-center">
                {profile?.name || editedUsername}
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                <Edit size={20} />
              </button>
            </div>
          )}

          <div className="w-full grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#333333] text-white py-2 px-4 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Online</span>
            </div>
            <div className="bg-[#333333] text-white py-2 px-4 rounded-full flex items-center justify-center">
              <div className="mr-2">👻</div>
              <span>Incógnito</span>
            </div>
          </div>
        </div>

        {/* Supplements section */}
        <div className="px-4 mb-8">
          <h3 className="text-white text-sm mb-3 uppercase">Suplementos</h3>
          <Button className="w-full mb-3 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-full flex items-center justify-start px-4">
            <Zap className="mr-2" size={20} />
            <span className="font-bold">Boost</span>
          </Button>
          <Button className="w-full bg-[#333333] hover:bg-[#444444] text-white py-3 rounded-full flex items-center justify-start px-4">
            <User className="mr-2 text-blue-500" size={20} />
            <span className="font-bold">Roam</span>
          </Button>
        </div>

        {/* Plan section */}
        <div className="px-4 mb-8">
          <h3 className="text-white text-sm mb-3 uppercase">Escolher um plano</h3>
          
          <div className="bg-[#333333] rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-yellow-500 font-bold text-lg">Obter XTRA</h4>
                <p className="text-gray-400">Acesse 5X mais perfis</p>
                <div className="flex mt-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 -mr-2"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-600 -mr-2"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-600 -mr-2"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-600 -mr-2"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                  <span className="text-gray-400 ml-2">+495</span>
                </div>
              </div>
              <button 
                onClick={handleViewPremiumPlans} 
                className="bg-white rounded-full p-2"
              >
                <ArrowRight size={24} className="text-black" />
              </button>
            </div>
          </div>
          
          <div className="bg-[#333333] rounded-lg p-4 mb-3">
            <h4 className="text-white font-bold text-lg">Comprar Ilimitado Para 7 Dias</h4>
            <p className="text-gray-400">Apenas R$ 129,9</p>
          </div>
          
          <div className="bg-[#333333] rounded-lg p-4">
            <h4 className="text-white font-bold text-lg">Comprar Ilimitado Para 1 Dia</h4>
            <p className="text-gray-400">Apenas R$ 49,9</p>
          </div>
        </div>

        {/* Menu options */}
        <div className="px-4 border-t border-[#333333] pt-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white py-3 mb-2"
            onClick={handleEditProfile}
          >
            <Edit className="mr-3" size={20} />
            <span>Editar perfil</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white py-3 mb-2"
            onClick={handleViewAlbums}
          >
            <Image className="mr-3" size={20} />
            <span>Meus álbuns</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-white py-3 mb-2">
            <Heart className="mr-3" size={20} />
            <span>Faça um teste de HIV</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-white py-3 mb-2">
            <Shield className="mr-3" size={20} />
            <span>Centro de segurança e privacidade</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white py-3 mb-2"
            onClick={handleViewSettings}
          >
            <Settings className="mr-3" size={20} />
            <span>Configurações</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
