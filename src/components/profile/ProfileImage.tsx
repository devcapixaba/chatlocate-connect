
import React from "react";
import { X } from "lucide-react";

interface ProfileImageProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ProfileImage = ({ src, alt, onClose }: ProfileImageProps) => {
  return (
    <div className="relative flex-1">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-black/60 rounded-full"
      >
        <X size={24} className="text-white" />
      </button>
      
      {/* User image */}
      <div className="h-full flex items-center justify-center">
        <img 
          src={src} 
          alt={alt} 
          className="max-h-full object-contain"
        />
      </div>
    </div>
  );
};
