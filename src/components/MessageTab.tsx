
interface MessageTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const MessageTab = ({ label, active, onClick }: MessageTabProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-center relative ${
        active ? "text-white font-medium" : "text-gray-500"
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
      )}
    </button>
  );
};
