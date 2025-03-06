
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

// Sample data of nearby users
export const nearbyUsers: User[] = [
  {
    id: "1",
    name: "So uns beijos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    distance: 0.5,
    status: "Looking for friends! 🏃‍♀️",
    online: true,
    lastOnline: "agora",
    height: 179,
  },
  {
    id: "2",
    name: "koe",
    avatar: "public/lovable-uploads/b8e63da0-3bca-46bf-8f21-34a48745e0ae.png",
    distance: 0.917,
    status: "Coffee enthusiast ☕",
    online: false,
    lastOnline: "10 horas atrás",
    height: 179,
  },
  {
    id: "3",
    name: "PSV AFIM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    distance: 2.1,
    status: "New to the area! 👋",
    online: false,
    lastOnline: "1 dia atrás",
    height: 179,
  },
  {
    id: "4",
    name: "brotheragem",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    distance: 3.2,
    status: "Just looking around",
    online: false,
    lastOnline: "2 dias atrás",
    height: 179,
  },
  {
    id: "5",
    name: "...",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eric",
    distance: 1.5,
    status: "Hi there",
    online: false,
    lastOnline: "3 dias atrás",
    height: 179,
  },
  {
    id: "6",
    name: "Novin 18",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
    distance: 0.9,
    status: "Hello world",
    online: true,
    lastOnline: "4 dias atrás",
    height: 179,
  },
  {
    id: "7",
    name: "9vinho",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=George",
    distance: 4.3,
    status: "Looking for fun",
    online: true,
    lastOnline: "5 dias atrás",
    height: 179,
  },
  {
    id: "8",
    name: "pau duro 🍆",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harry",
    distance: 2.7,
    status: "Music lover",
    online: false,
    lastOnline: "6 dias atrás",
    height: 179,
  },
  {
    id: "9",
    name: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ian",
    distance: 1.8,
    status: "Gym rat",
    online: false,
    lastOnline: "7 dias atrás",
    height: 179,
  },
];

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
  const [userLocation, setUserLocation] = useState<[number, number] | null>([40.7128, -74.0060]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleUserCardClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleChatClick = () => {
    if (selectedUser) {
      setActiveChatUser(selectedUser.name);
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
  };
};
