
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (
    file: File, 
    userId: string,
    bucket: string = 'profile_photos'
  ): Promise<string | null> => {
    try {
      setUploading(true);
      
      if (!file) return null;
      
      // Verificar o tipo do arquivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Erro ao fazer upload',
          description: 'Por favor, selecione apenas arquivos de imagem.',
          variant: 'destructive',
        });
        return null;
      }
      
      // Definir o caminho da pasta e nome do arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;
      
      // Fazer upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        toast({
          title: 'Erro ao fazer upload',
          description: error.message,
          variant: 'destructive',
        });
        return null;
      }
      
      // Obter a URL pública da imagem
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
      
      return urlData.publicUrl;
    } catch (error: any) {
      console.error('Erro no upload da imagem:', error);
      toast({
        title: 'Erro ao fazer upload',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Função para upload de múltiplas imagens
  const uploadMultipleImages = async (
    files: File[], 
    userId: string,
    bucket: string = 'profile_photos'
  ): Promise<string[]> => {
    try {
      setUploading(true);
      
      if (!files || files.length === 0) return [];
      
      const uploadPromises = files.map(file => uploadImage(file, userId, bucket));
      const results = await Promise.all(uploadPromises);
      
      // Filtrar resultados nulos (uploads que falharam)
      return results.filter(url => url !== null) as string[];
    } catch (error: any) {
      console.error('Erro no upload múltiplo de imagens:', error);
      toast({
        title: 'Erro ao fazer upload',
        description: error.message,
        variant: 'destructive',
      });
      return [];
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadImage,
    uploadMultipleImages
  };
};
