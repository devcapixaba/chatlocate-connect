
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelect: (files: File[]) => void;
  multiple?: boolean;
  maxImages?: number;
  previews?: string[];
  onRemovePreview?: (index: number) => void;
  loading?: boolean;
}

export const ImageUploader = ({
  onImageSelect,
  multiple = false,
  maxImages = 5,
  previews = [],
  onRemovePreview,
  loading = false
}: ImageUploaderProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    // Limitar número total de imagens (previews existentes + novas)
    const totalAllowed = maxImages - previews.length;
    const maxToProcess = Math.min(files.length, totalAllowed);

    if (maxToProcess <= 0) {
      toast({
        title: 'Limite de imagens atingido',
        description: `Você já atingiu o limite de ${maxImages} imagens.`,
        variant: 'destructive',
      });
      return;
    }

    // Processar cada arquivo
    for (let i = 0; i < maxToProcess; i++) {
      const file = files[i];
      
      // Verificar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Tipo de arquivo inválido',
          description: 'Por favor, selecione apenas imagens.',
          variant: 'destructive',
        });
        continue;
      }
      
      // Verificar tamanho (limitar a 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Arquivo muito grande',
          description: 'As imagens devem ter menos de 5MB.',
          variant: 'destructive',
        });
        continue;
      }
      
      // Criar URL de preview
      const previewUrl = URL.createObjectURL(file);
      newPreviewUrls.push(previewUrl);
      selectedFiles.push(file);
    }

    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    onImageSelect(selectedFiles);
    
    // Limpar input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePreview = (index: number) => {
    const newPreviews = [...previewUrls];
    
    // Revogar URL de objeto para evitar vazamento de memória
    URL.revokeObjectURL(newPreviews[index]);
    
    newPreviews.splice(index, 1);
    setPreviewUrls(newPreviews);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* Mostrar previews de fotos existentes */}
        {previews.map((url, index) => (
          <div 
            key={`existing-${index}`}
            className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300"
          >
            <img 
              src={url} 
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
            {onRemovePreview && (
              <button
                onClick={() => onRemovePreview(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                type="button"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            )}
          </div>
        ))}
        
        {/* Mostrar previews de novas fotos */}
        {previewUrls.map((url, index) => (
          <div 
            key={`new-${index}`}
            className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300"
          >
            <img 
              src={url} 
              alt={`New Preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemovePreview(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
              type="button"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
        
        {/* Botão de upload */}
        {(previews.length + previewUrls.length < maxImages) && (
          <div className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              ) : (
                <ImagePlus className="h-6 w-6 text-gray-400" />
              )}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple={multiple}
              className="hidden"
              disabled={loading}
            />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        {previews.length + previewUrls.length}/{maxImages} imagens. Máximo 5MB por imagem.
      </p>
    </div>
  );
};
