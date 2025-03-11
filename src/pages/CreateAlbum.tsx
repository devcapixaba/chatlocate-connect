import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const CreateAlbum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [albumName, setAlbumName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPhotos([...photos, ...newFiles]);
      
      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPhotoPreviews([...photoPreviews, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    
    const newPreviews = [...photoPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPhotoPreviews(newPreviews);
  };

  const createAlbum = async () => {
    if (!user) return;
    if (!albumName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o álbum",
        variant: "destructive",
      });
      return;
    }
    
    if (photos.length === 0) {
      toast({
        title: "Fotos obrigatórias",
        description: "Por favor, adicione pelo menos uma foto ao álbum",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Create album record first
      const { data: albumData, error: albumError } = await supabase
        .from('albums')
        .insert([
          { 
            name: albumName, 
            user_id: user.id,
            items_count: photos.length
          }
        ])
        .select();
      
      if (albumError) throw albumError;
      
      if (!albumData || albumData.length === 0) {
        throw new Error('Erro ao criar álbum');
      }
      
      const albumId = albumData[0].id;
      
      // Upload cover image if provided
      let coverImageUrl = null;
      if (coverImage) {
        const coverFilePath = `${user.id}/${albumId}/cover`;
        const { data: coverData, error: coverError } = await supabase.storage
          .from('user_photos')
          .upload(coverFilePath, coverImage, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (coverError) throw coverError;
        
        // Get public URL for cover image
        const { data: coverUrlData } = supabase.storage
          .from('user_photos')
          .getPublicUrl(coverFilePath);
        
        coverImageUrl = coverUrlData.publicUrl;
        
        // Update album with cover image URL
        await supabase
          .from('albums')
          .update({ cover_image: coverImageUrl })
          .eq('id', albumId);
      }
      
      // Upload all photos
      for (let i = 0; i < photos.length; i++) {
        const photoFilePath = `${user.id}/${albumId}/photo_${i}`;
        const { data: photoData, error: photoError } = await supabase.storage
          .from('user_photos')
          .upload(photoFilePath, photos[i], {
            cacheControl: '3600',
            upsert: true
          });
        
        if (photoError) throw photoError;
        
        // Get public URL for photo
        const { data: photoUrlData } = supabase.storage
          .from('user_photos')
          .getPublicUrl(photoFilePath);
        
        // Add photo to album_photos table
        await supabase
          .from('album_photos')
          .insert([{
            album_id: albumId,
            user_id: user.id,
            photo_url: photoUrlData.publicUrl
          }]);
      }
      
      toast({
        title: "Álbum criado",
        description: "Seu álbum foi criado com sucesso",
      });
      
      navigate("/albums");
    } catch (error: any) {
      toast({
        title: "Erro ao criar álbum",
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
      <div className="sticky top-0 z-10 bg-black p-4 border-b border-[#333333] flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-semibold ml-4">Criar Álbum</h1>
        </div>
        <Button 
          onClick={createAlbum}
          disabled={loading || !albumName.trim() || photos.length === 0}
          className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full px-4"
        >
          {loading ? "Criando..." : "Criar"}
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Album name */}
        <div>
          <label htmlFor="albumName" className="block text-sm text-gray-400 mb-2">
            Nome do álbum
          </label>
          <Input
            id="albumName"
            placeholder="Ex: Férias na praia"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className="bg-[#333333] border-[#444444] text-white"
            disabled={loading}
          />
        </div>
        
        {/* Cover image */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Capa do álbum (opcional)
          </label>
          <div className="relative bg-[#333333] rounded-lg aspect-square overflow-hidden">
            {coverPreview ? (
              <>
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => {
                    setCoverImage(null);
                    setCoverPreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-full"
                  disabled={loading}
                >
                  <X size={18} className="text-white" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                <Upload size={32} className="text-gray-500 mb-2" />
                <span className="text-gray-500">Selecionar capa</span>
                <input 
                  type="file" 
                  onChange={handleCoverImageChange} 
                  className="hidden" 
                  accept="image/*"
                  disabled={loading}
                />
              </label>
            )}
          </div>
        </div>
        
        {/* Photo grid */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Adicionar fotos
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Existing photos */}
            {photoPreviews.map((preview, index) => (
              <div key={index} className="relative aspect-square bg-[#333333] rounded-lg overflow-hidden">
                <img src={preview} alt={`Photo ${index}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 p-1 bg-black/60 rounded-full"
                  disabled={loading}
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            ))}
            
            {/* Add photo button */}
            <label className="flex flex-col items-center justify-center aspect-square bg-[#333333] rounded-lg cursor-pointer">
              <Plus size={24} className="text-gray-500" />
              <input 
                type="file" 
                onChange={handlePhotoChange} 
                className="hidden" 
                accept="image/*"
                multiple
                disabled={loading}
              />
            </label>
          </div>
        </div>
        
        {/* Photo count */}
        <div className="text-center text-sm text-gray-400">
          {photos.length > 0 ? (
            <p>{photos.length} {photos.length === 1 ? 'foto' : 'fotos'} selecionadas</p>
          ) : (
            <p>Adicione pelo menos uma foto</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAlbum;
