
import React from "react";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlbumDeleteDialogProps {
  deleting: boolean;
  onDelete: () => Promise<void>;
}

const AlbumDeleteDialog: React.FC<AlbumDeleteDialogProps> = ({
  deleting,
  onDelete,
}) => {
  return (
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
          onClick={onDelete}
          className="bg-red-500 text-white hover:bg-red-600"
          disabled={deleting}
        >
          {deleting ? "Excluindo..." : "Excluir"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlbumDeleteDialog;
