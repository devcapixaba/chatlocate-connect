
import { useState } from "react";
import { X, Zap, User, Image, Heart, Shield, Settings, ArrowRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
}

export const UserSidebar = ({ isOpen, onClose, username = "Novin" }: UserSidebarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);

  if (!isOpen) return null;

  const handleSaveUsername = () => {
    setIsEditing(false);
    // Here you would typically save the username to a database or state
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
          <div className="w-32 h-32 bg-[#333333] rounded-lg mb-4"></div>
          
          {isEditing ? (
            <div className="w-full relative mb-6">
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="w-full py-2 px-4 bg-[#333333] text-white text-lg font-medium rounded-full text-center"
                autoFocus
              />
              <button 
                onClick={handleSaveUsername}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="w-full relative mb-6">
              <div className="w-full py-2 px-4 bg-[#333333] text-white text-lg font-medium rounded-full text-center">{editedUsername}</div>
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
              <div className="bg-white rounded-full p-2">
                <ArrowRight size={24} className="text-black" />
              </div>
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
          <Button variant="ghost" className="w-full justify-start text-white py-3 mb-2">
            <Edit className="mr-3" size={20} />
            <span>Editar perfil</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-white py-3 mb-2">
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
          
          <Button variant="ghost" className="w-full justify-start text-white py-3 mb-2">
            <Settings className="mr-3" size={20} />
            <span>Configurações</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
