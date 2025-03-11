
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, UserX, Bell, Lock, Shield, Eye, HelpCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("minha-conta");

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      
      // Delete user data from Supabase
      if (user) {
        // First delete profile and related data
        await supabase.from('profiles').delete().eq('id', user.id);
        
        // Then sign out the user
        await supabase.auth.signOut();
      }
      
      toast({
        title: "Conta apagada",
        description: "Sua conta foi apagada com sucesso.",
      });
      
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Erro ao apagar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black p-4 border-b border-[#333333] flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-semibold">Configurações</h1>
      </div>

      {/* Tabs */}
      <Tabs 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-3 bg-[#222222] p-1">
            <TabsTrigger 
              value="minha-conta" 
              className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
            >
              Minha conta
            </TabsTrigger>
            <TabsTrigger 
              value="privacidade" 
              className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
            >
              Privacidade
            </TabsTrigger>
            <TabsTrigger 
              value="notificacoes" 
              className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
            >
              Notificações
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="minha-conta" className="mt-4">
          <div className="space-y-4 p-4">
            <div className="bg-[#222222] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[#333333]">
                <h3 className="font-semibold text-lg">Minha conta</h3>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start p-4 text-left text-red-500 font-normal"
                  >
                    <UserX className="mr-3" size={20} />
                    <span>Apagar perfil</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#222222] border-[#333333]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isto irá apagar permanentemente sua conta
                      e remover seus dados de nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-[#333333] text-white">Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-red-500 text-white"
                    >
                      {loading ? "Apagando..." : "Sim, apagar minha conta"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4 text-left text-yellow-500 font-normal"
                onClick={handleSignOut}
                disabled={loading}
              >
                <LogOut className="mr-3" size={20} />
                <span>{loading ? "Saindo..." : "Terminar sessão"}</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="privacidade" className="mt-4">
          <div className="space-y-4 p-4">
            <div className="bg-[#222222] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[#333333]">
                <h3 className="font-semibold text-lg">Segurança</h3>
              </div>
              
              <div className="flex items-center justify-between p-4 border-b border-[#333333]">
                <div className="flex items-center">
                  <Lock className="mr-3 text-gray-400" size={20} />
                  <span>Verificação em duas etapas</span>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Shield className="mr-3 text-gray-400" size={20} />
                  <span>Bloqueio do app</span>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="bg-[#222222] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[#333333]">
                <h3 className="font-semibold text-lg">Privacidade</h3>
              </div>
              
              <div className="flex items-center justify-between p-4 border-b border-[#333333]">
                <div className="flex items-center">
                  <Eye className="mr-3 text-gray-400" size={20} />
                  <span>Modo incógnito</span>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notificacoes" className="mt-4">
          <div className="space-y-4 p-4">
            <div className="bg-[#222222] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[#333333]">
                <h3 className="font-semibold text-lg">Notificações push</h3>
              </div>
              
              <div className="flex items-center justify-between p-4 border-b border-[#333333]">
                <div className="flex items-center">
                  <Bell className="mr-3 text-gray-400" size={20} />
                  <span>Novas mensagens</span>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Bell className="mr-3 text-gray-400" size={20} />
                  <span>Novos matches</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* App Info */}
      <div className="p-4 mt-4">
        <div className="bg-[#222222] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#333333]">
            <h3 className="font-semibold text-lg">Aplicativo</h3>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start p-4 text-left font-normal border-b border-[#333333]"
          >
            <HelpCircle className="mr-3 text-gray-400" size={20} />
            <span>Ajuda e suporte</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start p-4 text-left font-normal"
          >
            <Info className="mr-3 text-gray-400" size={20} />
            <span>Sobre</span>
          </Button>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
