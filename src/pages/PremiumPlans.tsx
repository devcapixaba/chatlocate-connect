
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PremiumPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black py-4 px-4 flex items-center justify-between border-b border-[#333333]">
        <button 
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-xl font-bold">Escolha um plano</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Tab Selection */}
      <div className="flex my-4 mx-4">
        <div className="flex-1 bg-white rounded-l-lg py-3 flex justify-center">
          <span className="font-bold text-black">XTRA</span>
        </div>
        <div className="flex-1 bg-[#333333] rounded-r-lg py-3 flex justify-center">
          <span className="text-gray-400">UNLIMITED</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-4 bg-yellow-500 rounded-lg overflow-hidden">
        <div className="p-6 pb-10">
          <h2 className="text-2xl font-bold text-black mb-1">XTRA</h2>
          <h3 className="text-4xl font-bold text-black mb-6">Encontre Mais Rápido</h3>
          
          <div className="flex items-center mb-4">
            <div className="bg-black/20 rounded-full p-2 mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="8" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xl text-black">600 perfis</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-black/20 rounded-full p-2 mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M7 12L10 15L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl text-black">No more Ads</span>
          </div>
        </div>
        
        {/* Pricing Options */}
        <div className="bg-black/40 pt-6 pb-4 px-4">
          <div className="flex gap-3 mb-3">
            {/* 1 Week Option */}
            <div className="flex-1 bg-[#5c4d10] border-2 border-yellow-500 rounded-lg p-4 flex flex-col items-center">
              <div className="text-2xl">1</div>
              <div className="text-sm">SEMANA</div>
              <div className="mt-2 text-xl font-bold">R$ 24,9</div>
            </div>
            
            {/* 1 Month Option */}
            <div className="flex-1 bg-[#292929] rounded-lg p-4 flex flex-col items-center">
              <div className="text-2xl">1</div>
              <div className="text-sm">MÊS</div>
              <div className="mt-2 text-xl font-bold">R$ 39,9</div>
              <div className="mt-1 text-xs bg-gray-600 px-2 py-1 rounded">Economizar 62%</div>
            </div>
            
            {/* 3 Months Option */}
            <div className="flex-1 bg-[#292929] rounded-lg p-4 flex flex-col items-center">
              <div className="text-2xl">3</div>
              <div className="text-sm">MESES</div>
              <div className="mt-2 text-xl font-bold">R$ 84,9</div>
              <div className="mt-1 text-xs bg-gray-600 px-2 py-1 rounded">Economizar 73%</div>
            </div>
          </div>
          
          <Button className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6 rounded-md">
            Continuar
          </Button>
          
          <p className="text-xs text-gray-400 mt-4">
            As compras de assinaturas serão cobradas da sua conta do iTunes. As assinaturas serão renovadas automaticamente com os mesmos termos, a não ser que sejam canceladas pelo menos 24 horas antes do fim do período atual. Você pode gerenciar ou cancelar a renovação automática nos Ajustes da sua conta do iTunes após a compra. Todo período de teste inutilizado será cancelado assim que você comprar uma assinatura. Para mais informações, visite nossos Termos e Política de Privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
