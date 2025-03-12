
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { TagInput } from "@/components/TagInput";
import { useImageUpload } from "@/hooks/useImageUpload";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    status: "",
    height: "",
    bio: "",
    age: "",
    weight: "",
    bodyType: "",
    position: "",
    ethnicity: "",
    relationship: "",
    instagram: "",
    facebook: "",
    twitter: "",
    spotify: "",
    showAge: true,
  });
  
  const [tags, setTags] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { uploading, uploadMultipleImages } = useImageUpload();

  useEffect(() => {
    if (profile) {
      setFormState({
        name: profile.name || "",
        status: profile.status || "",
        height: profile.height ? profile.height.toString() : "",
        bio: profile.bio || "",
        age: profile.age ? profile.age.toString() : "",
        weight: profile.weight ? profile.weight.toString() : "",
        bodyType: profile.body_type || "",
        position: profile.position || "",
        ethnicity: profile.ethnicity || "",
        relationship: profile.relationship || "",
        instagram: profile.instagram || "",
        facebook: profile.facebook || "",
        twitter: profile.twitter || "",
        spotify: profile.spotify || "",
        showAge: profile.show_age === null ? true : profile.show_age,
      });
      
      // Processar as tags
      if (profile.tags) {
        try {
          setTags(profile.tags.split(',').map(tag => tag.trim()));
        } catch (error) {
          console.error("Erro ao processar tags:", error);
          setTags([]);
        }
      }
      
      // Processar fotos existentes
      if (profile.photos && Array.isArray(profile.photos)) {
        setExistingImages(profile.photos);
      }
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (value: boolean, name: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (files: File[]) => {
    setNewImages(prev => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para atualizar seu perfil",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Upload das novas imagens
      let uploadedImageUrls: string[] = [];
      if (newImages.length > 0) {
        uploadedImageUrls = await uploadMultipleImages(newImages, user.id);
      }
      
      // Combinar imagens existentes e novas
      const allPhotos = [...existingImages, ...uploadedImageUrls];
      
      // Criar objeto com dados do perfil
      const profileData = {
        name: formState.name,
        status: formState.status,
        height: formState.height ? parseInt(formState.height) : null,
        bio: formState.bio,
        tags: tags.join(','),
        show_age: formState.showAge,
        age: formState.age ? parseInt(formState.age) : null,
        weight: formState.weight ? parseInt(formState.weight) : null,
        body_type: formState.bodyType,
        position: formState.position,
        ethnicity: formState.ethnicity,
        relationship: formState.relationship,
        instagram: formState.instagram,
        facebook: formState.facebook,
        twitter: formState.twitter,
        spotify: formState.spotify,
        photos: allPhotos
      };
      
      // Atualizar perfil
      await updateProfile(profileData);
      
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso",
      });
      
      // Redirecionar para a página do perfil
      navigate('/profile');
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Avatar - Placeholder para futuro upload de avatar */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-2">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-400">Foto de perfil</p>
        </div>

        {/* Seção: Informações Básicas */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium border-b border-white/10 pb-2">
            Informações Básicas
          </h2>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Seu nome"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={formState.status}
                onChange={handleInputChange}
                placeholder="Como você está se sentindo?"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formState.bio}
                onChange={handleInputChange}
                placeholder="Conte um pouco sobre você..."
                className="bg-gray-800 border-gray-700 min-h-24"
              />
            </div>
            
            <div>
              <Label>Tags</Label>
              <TagInput
                tags={tags}
                setTags={setTags}
                placeholder="Adicione tags que te descrevem..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Pressione Enter ou vírgula para adicionar uma tag
              </p>
            </div>
          </div>
        </div>

        {/* Seção: Características Físicas */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium border-b border-white/10 pb-2">
            Características Físicas
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="age" className="flex justify-between">
                <span>Idade</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Mostrar idade</span>
                  <Switch 
                    checked={formState.showAge} 
                    onCheckedChange={(value) => handleSwitchChange(value, 'showAge')}
                  />
                </div>
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formState.age}
                onChange={handleInputChange}
                placeholder="Sua idade"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={formState.height}
                onChange={handleInputChange}
                placeholder="Sua altura em cm"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formState.weight}
                onChange={handleInputChange}
                placeholder="Seu peso em kg"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="bodyType">Tipo Físico</Label>
              <Select 
                value={formState.bodyType}
                onValueChange={(value) => handleSelectChange(value, 'bodyType')}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slim">Magro</SelectItem>
                  <SelectItem value="athletic">Atlético</SelectItem>
                  <SelectItem value="average">Médio</SelectItem>
                  <SelectItem value="muscular">Musculoso</SelectItem>
                  <SelectItem value="curvy">Curvilíneo</SelectItem>
                  <SelectItem value="plus">Plus size</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="ethnicity">Etnia</Label>
              <Select 
                value={formState.ethnicity}
                onValueChange={(value) => handleSelectChange(value, 'ethnicity')}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asian">Asiático</SelectItem>
                  <SelectItem value="black">Negro</SelectItem>
                  <SelectItem value="latino">Latino</SelectItem>
                  <SelectItem value="middle_eastern">Oriente Médio</SelectItem>
                  <SelectItem value="mixed">Miscigenado</SelectItem>
                  <SelectItem value="native">Indígena</SelectItem>
                  <SelectItem value="white">Branco</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Seção: Preferências */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium border-b border-white/10 pb-2">
            Preferências
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="position">Posição</Label>
              <Select 
                value={formState.position}
                onValueChange={(value) => handleSelectChange(value, 'position')}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Ativo</SelectItem>
                  <SelectItem value="bottom">Passivo</SelectItem>
                  <SelectItem value="versatile">Versátil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="relationship">Relacionamento</Label>
              <Select 
                value={formState.relationship}
                onValueChange={(value) => handleSelectChange(value, 'relationship')}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Solteiro</SelectItem>
                  <SelectItem value="dating">Namorando</SelectItem>
                  <SelectItem value="open">Relacionamento aberto</SelectItem>
                  <SelectItem value="married">Casado</SelectItem>
                  <SelectItem value="complicated">Complicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Seção: Redes Sociais */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium border-b border-white/10 pb-2">
            Redes Sociais
          </h2>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                value={formState.instagram}
                onChange={handleInputChange}
                placeholder="@seu_instagram"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                name="facebook"
                value={formState.facebook}
                onChange={handleInputChange}
                placeholder="facebook.com/seu_perfil"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="twitter"
                value={formState.twitter}
                onChange={handleInputChange}
                placeholder="@seu_twitter"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="spotify">Spotify</Label>
              <Input
                id="spotify"
                name="spotify"
                value={formState.spotify}
                onChange={handleInputChange}
                placeholder="Seu perfil no Spotify"
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Seção: Fotos */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium border-b border-white/10 pb-2">
            Fotos
          </h2>
          
          <ImageUploader
            onImageSelect={handleImageSelect}
            multiple={true}
            maxImages={10}
            previews={existingImages}
            onRemovePreview={handleRemoveExistingImage}
            loading={uploading}
          />
        </div>

        {/* Botões */}
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
      </form>
    </div>
  );
};

export default EditProfile;
