
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlbumHeaderProps {
  albumName: string;
  loading: boolean;
  deleting: boolean;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({
  albumName,
  loading,
  deleting,
  showDeleteDialog,
  setShowDeleteDialog,
}) => {
  const navigate = useNavigate();

  return (
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
        <h1 className="text-xl font-semibold ml-4">{albumName || 'Álbum'}</h1>
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
      </AlertDialog>
    </div>
  );
};

export default AlbumHeader;
