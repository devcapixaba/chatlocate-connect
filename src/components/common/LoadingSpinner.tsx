
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const LoadingSpinner = ({ 
  size = "md", 
  color = "yellow-500" 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex justify-center py-4">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 border-${color}`}></div>
    </div>
  );
};
