
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/TagInput";

interface BasicInfoSectionProps {
  formState: {
    name: string;
    status: string;
    bio: string;
  };
  tags: string[];
  setTags: (tags: string[]) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfoSection = ({ 
  formState, 
  tags, 
  setTags, 
  handleInputChange 
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium border-b border-white/10 pb-2">
        Informações Básicas
      </h2>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Seu nome"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            name="status"
            value={formState.status}
            onChange={handleInputChange}
            placeholder="Como você está se sentindo?"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formState.bio}
            onChange={handleInputChange}
            placeholder="Conte um pouco sobre você..."
            className="bg-gray-800 border-gray-700 min-h-24"
          />
        </div>
        
        <div>
          <Label>Tags</Label>
          <TagInput
            tags={tags}
            setTags={setTags}
            placeholder="Adicione tags que te descrevem..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Pressione Enter ou vírgula para adicionar uma tag
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
