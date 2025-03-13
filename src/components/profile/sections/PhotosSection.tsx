
import { ImageUploader } from "@/components/ImageUploader";

interface PhotosSectionProps {
  uploading: boolean;
  existingImages: string[];
  handleImageSelect: (files: File[]) => void;
  handleRemoveExistingImage: (index: number) => void;
}

const PhotosSection = ({
  uploading,
  existingImages,
  handleImageSelect,
  handleRemoveExistingImage
}: PhotosSectionProps) => {
  return (
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
  );
};

export default PhotosSection;
