
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface PhysicalCharacteristicsSectionProps {
  formState: {
    age: string;
    height: string;
    weight: string;
    bodyType: string;
    ethnicity: string;
    showAge: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSwitchChange: (value: boolean, name: string) => void;
}

const PhysicalCharacteristicsSection = ({ 
  formState,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange
}: PhysicalCharacteristicsSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium border-b border-white/10 pb-2">
        Características Físicas
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="age" className="flex justify-between">
            <span>Idade</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Mostrar idade</span>
              <Switch 
                checked={formState.showAge} 
                onCheckedChange={(value) => handleSwitchChange(value, 'showAge')}
              />
            </div>
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formState.age}
            onChange={handleInputChange}
            placeholder="Sua idade"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={formState.height}
            onChange={handleInputChange}
            placeholder="Sua altura em cm"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            value={formState.weight}
            onChange={handleInputChange}
            placeholder="Seu peso em kg"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="bodyType">Tipo Físico</Label>
          <Select 
            value={formState.bodyType}
            onValueChange={(value) => handleSelectChange(value, 'bodyType')}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slim">Magro</SelectItem>
              <SelectItem value="athletic">Atlético</SelectItem>
              <SelectItem value="average">Médio</SelectItem>
              <SelectItem value="muscular">Musculoso</SelectItem>
              <SelectItem value="curvy">Curvilíneo</SelectItem>
              <SelectItem value="plus">Plus size</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ethnicity">Etnia</Label>
          <Select 
            value={formState.ethnicity}
            onValueChange={(value) => handleSelectChange(value, 'ethnicity')}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asian">Asiático</SelectItem>
              <SelectItem value="black">Negro</SelectItem>
              <SelectItem value="latino">Latino</SelectItem>
              <SelectItem value="middle_eastern">Oriente Médio</SelectItem>
              <SelectItem value="mixed">Miscigenado</SelectItem>
              <SelectItem value="native">Indígena</SelectItem>
              <SelectItem value="white">Branco</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PhysicalCharacteristicsSection;
