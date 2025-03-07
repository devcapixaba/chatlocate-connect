
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";
import { Profile } from "@/lib/supabase";

// Define user type to make it reusable
export interface User {
  id: string;
  name: string;
  avatar: string;
  distance?: number;
  status?: string;
  online?: boolean;
  lastOnline?: string;
  height?: number;
}

// Filter definitions
export interface Filter {
  id: string;
  icon: string; 
  label: string;
  active: boolean;
}

export const filters: Filter[] = [
  { id: "all", icon: "🔍", label: "", active: true },
  { id: "age", icon: "", label: "Age", active: false },
  { id: "fresh", icon: "", label: "Fresh", active: false },
  { id: "online", icon: "", label: "Online", active: false },
  { id: "position", icon: "", label: "Position", active: false },
];

export const useHomeScreen = () => {
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const { user } = useAuth();

  // Convert Supabase profiles to the User format needed by the UI
  const nearbyUsers: User[] = users.map((profile: Profile) => ({
    id: profile.id,
    name: profile.name || "",
    avatar: profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`,
    distance: Math.random() * 5, // Random distance for demo
    status: profile.status || "",
    online: profile.online,
    lastOnline: profile.last_online,
    height: profile.height || 170,
  }));

  const handleUserCardClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleChatClick = () => {
    if (selectedUser) {
      navigate(`/messages/${selectedUser.id}`, { 
        state: { 
          messageData: {
            id: selectedUser.id,
            name: selectedUser.name,
            avatar: selectedUser.avatar
          } 
        } 
      });
      setSelectedUser(null);
    }
  };

  const handleProfileClose = () => {
    setSelectedUser(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return {
    activeChatUser,
    setActiveChatUser,
    activeFilter,
    setActiveFilter,
    selectedUser,
    sidebarOpen,
    handleUserCardClick,
    handleChatClick,
    handleProfileClose,
    toggleSidebar,
    setSidebarOpen,
    nearbyUsers,
    loading
  };
};
