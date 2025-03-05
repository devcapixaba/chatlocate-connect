
interface FilterButtonProps {
  icon?: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export const FilterButton = ({ icon, label, active = false, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-5 py-2 rounded-full ${
        active 
          ? "bg-yellow-500 text-black font-medium" 
          : "bg-[#333333] text-white"
      } min-w-max`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
};
