
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

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

export const useAlbumView = (albumId: string | undefined) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user && albumId) {
      fetchAlbumData();
    }
  }, [user, albumId]);

  const fetchAlbumData = async () => {
    try {
      setLoading(true);
      
      // Fetch album details
      const { data: albumData, error: albumError } = await supabase
        .from('albums')
        .select('*')
        .eq('id', albumId)
        .eq('user_id', user?.id)
        .single();
      
      if (albumError) throw albumError;
      
      setAlbum(albumData);
      
      // Fetch photos in the album
      const { data: photosData, error: photosError } = await supabase
        .from('album_photos')
        .select('*')
        .eq('album_id', albumId)
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
    if (!user || !albumId) return;
    
    try {
      setDeleting(true);
      
      // Delete album photos records
      const { error: photosError } = await supabase
        .from('album_photos')
        .delete()
        .eq('album_id', albumId)
        .eq('user_id', user.id);
      
      if (photosError) throw photosError;
      
      // Delete album record
      const { error: albumError } = await supabase
        .from('albums')
        .delete()
        .eq('id', albumId)
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

  return {
    album,
    photos,
    loading,
    deleting,
    showDeleteDialog,
    setShowDeleteDialog,
    handleDeleteAlbum
  };
};
