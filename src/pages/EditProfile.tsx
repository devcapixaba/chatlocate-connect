
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, X, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const EditProfile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Novin");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState("");
  const [showAge, setShowAge] = useState(true);
  const [age, setAge] = useState("18");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [spotify, setSpotify] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black py-3 px-4 border-b border-[#333333] flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Editar perfil</h1>
        <div className="w-10"></div> {/* Placeholder for spacing */}
      </div>

      <div className="pb-20">
        {/* Profile Photos */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="aspect-square bg-[#333333] relative flex items-center justify-center">
                {index === 1 && (
                  <div className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 pt-4">
          <div className="px-4">
            <div className="flex justify-between items-center">
              <label htmlFor="displayName" className="text-white">Nome de exibição</label>
              <span className="text-gray-500 text-sm">5/15</span>
            </div>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-transparent border-none text-white px-0 focus-visible:ring-0"
            />
          </div>

          <div className="px-4">
            <div className="flex justify-between items-center">
              <label htmlFor="bio" className="text-white">Sobre mim</label>
              <span className="text-gray-500 text-sm">0/255</span>
            </div>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Diga às pessoas quem é e o que procura (não o que não procura)"
              className="bg-transparent border-none text-gray-400 px-0 focus-visible:ring-0"
            />
          </div>

          <div className="px-4">
            <div className="flex justify-between items-center">
              <label htmlFor="tags" className="text-white">As Minhas Tags</label>
            </div>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Adicionar palavras-chave para ser encontrado mais facilmente"
              className="bg-transparent border-none text-gray-400 px-0 focus-visible:ring-0"
            />
          </div>

          {/* Statistics Section */}
          <div className="border-t border-[#222222] pt-4">
            <div className="px-4 pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              <span className="text-white font-medium">Estatísticas</span>
            </div>

            <div className="px-4 py-3 flex justify-between items-center">
              <span>Mostrar idade</span>
              <Switch checked={showAge} onCheckedChange={setShowAge} />
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Idade</span>
              <span>{age}</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Altura</span>
              <span className="text-gray-400">Adicionar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Peso</span>
              <span className="text-gray-400">Adicionar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Porte físico</span>
              <span className="text-gray-400">Adicionar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Posição</span>
              <span className="text-gray-400">Adicionar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Etnia</span>
              <span className="text-gray-400">Adicionar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Relacionamento atual</span>
              <span className="text-gray-400">Adicionar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Minhas Tribos</span>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Nenhuma</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Expectativas Section */}
          <div className="border-t border-[#222222] pt-4">
            <div className="px-4 pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
              <span className="text-white font-medium">Expectativas</span>
            </div>

            <div className="px-4 py-3 flex justify-between items-center">
              <span>Em busca de</span>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Nenhuma</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Local de encontro</span>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Nenhuma</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Aceitar fotos NSFW</span>
              <span className="text-gray-400">Editar</span>
            </div>
          </div>

          {/* Identity Section */}
          <div className="border-t border-[#222222] pt-4">
            <div className="px-4 pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span className="text-white font-medium">IDENTIDADE</span>
            </div>

            <div className="px-4 py-3 flex justify-between items-center">
              <span>Sexo</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Pronomes</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>

          {/* Health Section */}
          <div className="border-t border-[#222222] pt-4">
            <div className="px-4 pb-2 flex items-center">
              <X className="mr-2" size={20} />
              <span className="text-white font-medium">SAÚDE</span>
            </div>

            <div className="px-4 py-3 flex justify-between items-center">
              <span>Exame de HIV</span>
              <span>Não mostrar</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Último exame</span>
              <span className="text-gray-400">Insira data de teste</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222]">
              <span>Insira seu status de HIV para adicionar a data do último teste.</span>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
              <span>Lembretes de teste</span>
              <span>Desativado</span>
            </div>
          </div>

          {/* Health Options */}
          <div className="px-4 py-3 border-t border-[#222222]">
            <div className="text-gray-300 mb-4">
              Um lembrete será exibido na caixa de entrada do seu Grindr no momento especificado.
            </div>
          </div>

          <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
            <span>Práticas de saúde</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          <div className="px-4 py-3 border-t border-[#222222] flex justify-between items-center">
            <span>Vacinas</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          <div className="px-4 py-3 border-t border-[#222222]">
            <div className="flex justify-between items-center">
              <span>Perguntas de Saúde Sexual</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Aprenda mais sobre HIV, PrPE, como fazer teste para doenças sexualmente transmissíveis (DSTs), o comprometimento do Grindr com a privacidade dessas informações e outras perguntas frequentes.
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-[#222222] pt-4">
            <div className="px-4 pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M6.77 9.15 1 7.5l1.5-1.5 4.2.9" />
                <path d="m10.24 14.37-1.47 1.48-2.5-2.5 1.47-1.48" />
                <path d="m13.42 11.2 1.47-1.48 2.5 2.5-1.47 1.48" />
                <path d="M13.5 9 10 15" />
                <path d="m22 5-7.5 7.5" />
                <path d="M22 2 12 12 9 15 7.5 16.5l-1.5 3 3-1.5L10.5 15" />
              </svg>
              <span className="text-white font-medium">LINKS SOCIAIS</span>
            </div>

            <div className="px-4 py-3 flex items-center">
              <Instagram className="w-8 h-8 mr-3" />
              <div className="flex-1">
                <div>Instagram</div>
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Insira seu nome de usuário do Instagram"
                  className="bg-transparent border-none text-gray-400 px-0 py-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex items-center">
              <div className="w-8 h-8 mr-3 flex items-center justify-center">X</div>
              <div className="flex-1">
                <div>X</div>
                <Input
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="Insira seu nome de usuário do X"
                  className="bg-transparent border-none text-gray-400 px-0 py-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex items-center">
              <Facebook className="w-8 h-8 mr-3" />
              <div className="flex-1">
                <div>Facebook</div>
                <Input
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="Insira seu nome de usuário do Facebook"
                  className="bg-transparent border-none text-gray-400 px-0 py-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#222222] flex items-center">
              <div className="w-8 h-8 mr-3 bg-[#1DB954] rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div>Spotify</div>
                <Input
                  value={spotify}
                  onChange={(e) => setSpotify(e.target.value)}
                  placeholder="Adicione suas músicas favoritas"
                  className="bg-transparent border-none text-gray-400 px-0 py-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
