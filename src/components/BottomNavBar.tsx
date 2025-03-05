
import { Button } from "@/components/ui/button";
import { Home, Search, MessageSquare, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavButton = ({ icon, label, to, active }: NavButtonProps) => (
  <Link to={to} className="flex-1">
    <Button
      variant="ghost"
      className={`w-full h-full flex flex-col items-center justify-center py-2 px-0 rounded-none ${
        active ? "text-primary" : "text-gray-400"
      }`}
    >
      {icon}
      <span className="text-[10px] mt-1">{label}</span>
    </Button>
  </Link>
);

interface BottomNavBarProps {
  activeTab?: string;
}

export const BottomNavBar = ({ activeTab = "explore" }: BottomNavBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#222222] border-t border-[#333333] flex items-center z-50">
      <NavButton
        icon={<Home size={20} />}
        label="Explore"
        to="/"
        active={activeTab === "explore"}
      />
      <NavButton
        icon={<MessageSquare size={20} />}
        label="Messages"
        to="/messages"
        active={activeTab === "messages"}
      />
      <NavButton
        icon={<Search size={20} />}
        label="Filter"
        to="/filter"
        active={activeTab === "filter"}
      />
      <NavButton
        icon={<User size={20} />}
        label="Profile"
        to="/profile"
        active={activeTab === "profile"}
      />
      <NavButton
        icon={<Settings size={20} />}
        label="Settings"
        to="/settings"
        active={activeTab === "settings"}
      />
    </div>
  );
};
