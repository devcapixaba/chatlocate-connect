
import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlbumPhoto {
  id: string;
  photo_url: string;
  created_at: string;
}

interface AlbumContentProps {
  loading: boolean;
  photos: AlbumPhoto[];
}

const AlbumContent: React.FC<AlbumContentProps> = ({ loading, photos }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
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
    );
  }

  return (
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
  );
};

export default AlbumContent;
