import { useState } from "react";
import { UserCard } from "@/components/UserCard";
import { ChatPanel } from "@/components/ChatPanel";
import { Input } from "@/components/ui/input";
import { User, Search, Eye } from "lucide-react";
import { BottomNavBar } from "@/components/BottomNavBar";
import { FilterButton } from "@/components/FilterButton";
import { ProfilePreview } from "@/components/ProfilePreview";
import { UserSidebar } from "@/components/UserSidebar";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const nearbyUsers = [
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

const filters = [
  { id: "all", icon: "🔍", label: "", active: true },
  { id: "age", icon: "", label: "Age", active: false },
  { id: "fresh", icon: "", label: "Fresh", active: false },
  { id: "online", icon: "", label: "Online", active: false },
  { id: "position", icon: "", label: "Position", active: false },
];

const Index = () => {
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>([40.7128, -74.0060]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<typeof nearbyUsers[0] | null>(null);
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

  const handleUserCardClick = (user: typeof nearbyUsers[0]) => {
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

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black py-3 px-4 border-b border-[#333333]">
        <div className="flex items-center justify-between">
          <button 
            className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center"
            onClick={toggleSidebar}
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

      {/* User grid */}
      <div className="grid grid-cols-3 gap-px mt-px">
        {nearbyUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onChat={() => handleUserCardClick(user)}
          />
        ))}
      </div>

      {activeChatUser && (
        <ChatPanel
          recipientName={activeChatUser}
          onClose={() => setActiveChatUser(null)}
        />
      )}
      
      {selectedUser && (
        <ProfilePreview 
          user={selectedUser}
          onClose={handleProfileClose}
          onChat={handleChatClick}
        />
      )}
      
      <UserSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />
      
      <BottomNavBar activeTab="explore" />
      <Toaster />
    </div>
  );
};

export default Index;
