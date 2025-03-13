
import { useAuth } from "@/hooks/useAuth";
import { useProfileForm } from "@/hooks/useProfileForm";
import ProfileFormHeader from "@/components/profile/ProfileFormHeader";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import BasicInfoSection from "@/components/profile/sections/BasicInfoSection";
import PhysicalCharacteristicsSection from "@/components/profile/sections/PhysicalCharacteristicsSection";
import PreferencesSection from "@/components/profile/sections/PreferencesSection";
import SocialMediaSection from "@/components/profile/sections/SocialMediaSection";
import PhotosSection from "@/components/profile/sections/PhotosSection";
import ProfileFormActions from "@/components/profile/ProfileFormActions";

const EditProfile = () => {
  const { profile } = useAuth();
  const {
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
  } = useProfileForm();

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <ProfileFormHeader loading={loading} />

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <ProfileAvatar avatar={profile?.avatar} name={formState.name} />

        <BasicInfoSection 
          formState={formState}
          tags={tags}
          setTags={setTags}
          handleInputChange={handleInputChange}
        />

        <PhysicalCharacteristicsSection 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSwitchChange={handleSwitchChange}
        />

        <PreferencesSection 
          formState={formState}
          handleSelectChange={handleSelectChange}
        />

        <SocialMediaSection 
          formState={formState}
          handleInputChange={handleInputChange}
        />

        <PhotosSection 
          uploading={uploading}
          existingImages={existingImages}
          handleImageSelect={handleImageSelect}
          handleRemoveExistingImage={handleRemoveExistingImage}
        />

        <ProfileFormActions 
          loading={loading}
          uploading={uploading}
        />
      </form>
    </div>
  );
};

export default EditProfile;
