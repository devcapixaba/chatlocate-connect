
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Album {
  id: string;
  name: string;
  cover_image: string | null;
  items_count: number;
  created_at: string;
}

const MyAlbums = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAlbums();
    }
  }, [user]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setAlbums(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar álbuns",
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
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-semibold">Meus Álbums</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/albums/create")}
        >
          <Plus size={24} />
        </Button>
      </div>

      {/* Albums grid */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-24 h-24 bg-[#222222] rounded-lg mb-4 flex items-center justify-center">
              <Edit size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sem álbums</h3>
            <p className="text-gray-400 mb-6">Você ainda não criou nenhum álbum. Clique no botão abaixo para criar seu primeiro álbum.</p>
            <Button 
              onClick={() => navigate("/albums/create")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full px-6"
            >
              <Plus size={18} className="mr-2" />
              Criar álbum
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {albums.map((album) => (
              <div 
                key={album.id} 
                className="bg-[#222222] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => navigate(`/albums/${album.id}`)}
              >
                <div className="aspect-square bg-[#333333] relative">
                  {album.cover_image ? (
                    <img 
                      src={album.cover_image} 
                      alt={album.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Edit size={32} className="text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate">{album.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{album.items_count} fotos</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAlbums;
