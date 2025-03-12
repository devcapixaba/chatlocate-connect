
import { useParams } from "react-router-dom";
import { useAlbumView } from "@/hooks/useAlbumView";
import AlbumHeader from "@/components/album/AlbumHeader";
import AlbumContent from "@/components/album/AlbumContent";
import AlbumDeleteDialog from "@/components/album/AlbumDeleteDialog";
import { AlertDialog } from "@/components/ui/alert-dialog";

const AlbumView = () => {
  const { id } = useParams<{ id: string }>();
  const {
    album,
    photos,
    loading,
    deleting,
    showDeleteDialog,
    setShowDeleteDialog,
    handleDeleteAlbum
  } = useAlbumView(id);

  return (
    <div className="min-h-screen bg-black text-white">
      <AlbumHeader
        albumName={album?.name || ''}
        loading={loading}
        deleting={deleting}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlbumDeleteDialog
          deleting={deleting}
          onDelete={handleDeleteAlbum}
        />
      </AlertDialog>

      <AlbumContent
        loading={loading}
        photos={photos}
      />
    </div>
  );
};

export default AlbumView;
