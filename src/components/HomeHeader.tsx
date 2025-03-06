
import { Input } from "@/components/ui/input";
import { User, Search, Eye } from "lucide-react";
import { FilterButton } from "@/components/FilterButton";
import { filters } from "@/hooks/useHomeScreen";

interface HomeHeaderProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  onToggleSidebar: () => void;
}

export const HomeHeader = ({ 
  activeFilter, 
  setActiveFilter, 
  onToggleSidebar 
}: HomeHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-black py-3 px-4 border-b border-[#333333]">
      <div className="flex items-center justify-between">
        <button 
          className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center"
          onClick={onToggleSidebar}
        >
          <User size={20} className="text-gray-400" />
        </button>
        
        <div className="flex-1 mx-4">
          <div className="relative">
            <Input 
              className="w-full pl-10 h-10 bg-[#333333] border-none rounded-full text-white"
              placeholder="Explore other locations"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center px-3 py-2 bg-[#333333] rounded-full">
          <Eye className="h-5 w-5 text-white mr-2" />
          <span className="text-white font-medium">67</span>
        </div>
      </div>
      
      {/* Filter buttons */}
      <div className="flex space-x-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            icon={filter.icon}
            label={filter.label}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </div>
    </div>
  );
};
