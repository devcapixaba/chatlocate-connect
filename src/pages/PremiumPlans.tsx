
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PremiumPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black py-3 px-4 border-b border-[#333333] flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold ml-4">Escolher um plano</h1>
      </div>

      {/* Plans */}
      <div className="p-4 space-y-4">
        <div className="bg-[#333333] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-yellow-500 font-bold text-lg">XTRA</h4>
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
          </div>
          <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
            Assinar por R$ 29,90/mês
          </Button>
        </div>
        
        <div className="bg-[#333333] rounded-lg p-4">
          <h4 className="text-white font-bold text-lg">Ilimitado</h4>
          <p className="text-gray-400">Navegue sem limites</p>
          <Button className="w-full mt-4 bg-[#444444] hover:bg-[#555555] text-white">
            Assinar por R$ 49,90/mês
          </Button>
        </div>
        
        <div className="bg-[#333333] rounded-lg p-4">
          <h4 className="text-white font-bold text-lg">Pacote para 7 dias</h4>
          <p className="text-gray-400">Acesso completo por uma semana</p>
          <Button className="w-full mt-4 bg-[#444444] hover:bg-[#555555] text-white">
            Comprar por R$ 129,90
          </Button>
        </div>
        
        <div className="bg-[#333333] rounded-lg p-4">
          <h4 className="text-white font-bold text-lg">Pacote para 1 dia</h4>
          <p className="text-gray-400">Acesso completo por 24 horas</p>
          <Button className="w-full mt-4 bg-[#444444] hover:bg-[#555555] text-white">
            Comprar por R$ 49,90
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
