
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PreferencesSectionProps {
  formState: {
    position: string;
    relationship: string;
  };
  handleSelectChange: (value: string, name: string) => void;
}

const PreferencesSection = ({ 
  formState, 
  handleSelectChange 
}: PreferencesSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium border-b border-white/10 pb-2">
        Preferências
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="position">Posição</Label>
          <Select 
            value={formState.position}
            onValueChange={(value) => handleSelectChange(value, 'position')}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Ativo</SelectItem>
              <SelectItem value="bottom">Passivo</SelectItem>
              <SelectItem value="versatile">Versátil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="relationship">Relacionamento</Label>
          <Select 
            value={formState.relationship}
            onValueChange={(value) => handleSelectChange(value, 'relationship')}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Solteiro</SelectItem>
              <SelectItem value="dating">Namorando</SelectItem>
              <SelectItem value="open">Relacionamento aberto</SelectItem>
              <SelectItem value="married">Casado</SelectItem>
              <SelectItem value="complicated">Complicado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
