
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Profile } from "@/lib/supabase";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ProfileFormState {
  name: string;
  status: string;
  height: string;
  bio: string;
  age: string;
  weight: string;
  bodyType: string;
  position: string;
  ethnicity: string;
  relationship: string;
  instagram: string;
  facebook: string;
  twitter: string;
  spotify: string;
  showAge: boolean;
}

export const useProfileForm = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<ProfileFormState>({
    name: "",
    status: "",
    height: "",
    bio: "",
    age: "",
    weight: "",
    bodyType: "",
    position: "",
    ethnicity: "",
    relationship: "",
    instagram: "",
    facebook: "",
    twitter: "",
    spotify: "",
    showAge: true,
  });
  
  const [tags, setTags] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { uploading, uploadMultipleImages } = useImageUpload();

  useEffect(() => {
    if (profile) {
      setFormState({
        name: profile.name || "",
        status: profile.status || "",
        height: profile.height ? profile.height.toString() : "",
        bio: profile.bio || "",
        age: profile.age ? profile.age.toString() : "",
        weight: profile.weight ? profile.weight.toString() : "",
        bodyType: profile.body_type || "",
        position: profile.position || "",
        ethnicity: profile.ethnicity || "",
        relationship: profile.relationship || "",
        instagram: profile.instagram || "",
        facebook: profile.facebook || "",
        twitter: profile.twitter || "",
        spotify: profile.spotify || "",
        showAge: profile.show_age === null ? true : profile.show_age,
      });
      
      // Process tags
      if (profile.tags) {
        try {
          setTags(profile.tags.split(',').map(tag => tag.trim()));
        } catch (error) {
          console.error("Error processing tags:", error);
          setTags([]);
        }
      }
      
      // Process existing photos
      if (profile.photos && Array.isArray(profile.photos)) {
        setExistingImages(profile.photos);
      }
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (value: boolean, name: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (files: File[]) => {
    setNewImages(prev => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para atualizar seu perfil",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Upload new images
      let uploadedImageUrls: string[] = [];
      if (newImages.length > 0) {
        uploadedImageUrls = await uploadMultipleImages(newImages, user.id);
      }
      
      // Combine existing and new images
      const allPhotos = [...existingImages, ...uploadedImageUrls];
      
      // Create profile data object
      const profileData = {
        name: formState.name,
        status: formState.status,
        height: formState.height ? parseInt(formState.height) : null,
        bio: formState.bio,
        tags: tags.join(','),
        show_age: formState.showAge,
        age: formState.age ? parseInt(formState.age) : null,
        weight: formState.weight ? parseInt(formState.weight) : null,
        body_type: formState.bodyType,
        position: formState.position,
        ethnicity: formState.ethnicity,
        relationship: formState.relationship,
        instagram: formState.instagram,
        facebook: formState.facebook,
        twitter: formState.twitter,
        spotify: formState.spotify,
        photos: allPhotos
      };
      
      // Update profile
      await updateProfile(profileData);
      
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso",
      });
      
      // Redirect to profile page
      navigate('/profile');
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formState,
    loading,
    tags,
    setTags,
    uploading,
    existingImages,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleImageSelect,
    handleRemoveExistingImage,
    handleSubmit
  };
};
