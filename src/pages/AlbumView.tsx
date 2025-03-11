
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
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

interface AlbumPhoto {
  id: string;
  photo_url: string;
  created_at: string;
}

interface Album {
  id: string;
  name: string;
  cover_image: string | null;
  items_count: number;
  created_at: string;
}

const AlbumView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user && id) {
      fetchAlbumData();
    }
  }, [user, id]);

  const fetchAlbumData = async () => {
    try {
      setLoading(true);
      
      // Fetch album details
      const { data: albumData, error: albumError } = await supabase
        .from('albums')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();
      
      if (albumError) throw albumError;
      
      setAlbum(albumData);
      
      // Fetch photos in the album
      const { data: photosData, error: photosError } = await supabase
        .from('album_photos')
        .select('*')
        .eq('album_id', id)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });
      
      if (photosError) throw photosError;
      
      setPhotos(photosData || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar álbum",
        description: error.message,
        variant: "destructive",
      });
      navigate('/albums');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async () => {
    if (!user || !id) return;
    
    try {
      setDeleting(true);
      
      // Delete album photos from storage
      // This would require listing files in the storage bucket first
      // For simplicity, we'll just delete the database records
      
      // Delete album photos records
      const { error: photosError } = await supabase
        .from('album_photos')
        .delete()
        .eq('album_id', id)
        .eq('user_id', user.id);
      
      if (photosError) throw photosError;
      
      // Delete album record
      const { error: albumError } = await supabase
        .from('albums')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (albumError) throw albumError;
      
      toast({
        title: "Álbum excluído",
        description: "Seu álbum foi excluído com sucesso",
      });
      
      navigate('/albums');
    } catch (error: any) {
      toast({
        title: "Erro ao excluir álbum",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
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
            onClick={() => navigate('/albums')}
            disabled={loading || deleting}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-semibold ml-4">{album?.name || 'Álbum'}</h1>
        </div>
        
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              disabled={loading || deleting}
            >
              <MoreVertical size={24} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#222222] border-[#333333]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Excluir álbum</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este álbum? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                className="bg-[#333333] text-white"
                disabled={deleting}
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteAlbum}
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={deleting}
              >
                {deleting ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-24 h-24 bg-[#222222] rounded-lg mb-4 flex items-center justify-center">
            <Trash size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Sem fotos</h3>
          <p className="text-gray-400 mb-6">Este álbum não contém fotos.</p>
          <Button 
            onClick={() => navigate('/albums')}
            className="bg-[#333333] hover:bg-[#444444] text-white rounded-full px-6"
          >
            Voltar
          </Button>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="aspect-square bg-[#222222] rounded-lg overflow-hidden"
              >
                <img 
                  src={photo.photo_url} 
                  alt="Album photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumView;
