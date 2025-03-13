
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialMediaSectionProps {
  formState: {
    instagram: string;
    facebook: string;
    twitter: string;
    spotify: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaSection = ({ 
  formState, 
  handleInputChange 
}: SocialMediaSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium border-b border-white/10 pb-2">
        Redes Sociais
      </h2>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            name="instagram"
            value={formState.instagram}
            onChange={handleInputChange}
            placeholder="@seu_instagram"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            name="facebook"
            value={formState.facebook}
            onChange={handleInputChange}
            placeholder="facebook.com/seu_perfil"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            name="twitter"
            value={formState.twitter}
            onChange={handleInputChange}
            placeholder="@seu_twitter"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="spotify">Spotify</Label>
          <Input
            id="spotify"
            name="spotify"
            value={formState.spotify}
            onChange={handleInputChange}
            placeholder="Seu perfil no Spotify"
            className="bg-gray-800 border-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
