
import { useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { BottomNavBar } from "@/components/BottomNavBar";
import { ProfilePreview } from "@/components/ProfilePreview";
import { UserSidebar } from "@/components/UserSidebar";
import { Toaster } from "@/components/ui/toaster";
import { HomeHeader } from "@/components/HomeHeader";
import { UserGrid } from "@/components/UserGrid";
import { useHomeScreen } from "@/hooks/useHomeScreen";

const Index = () => {
  const {
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
    nearbyUsers
  } = useHomeScreen();

  const [showFavorites, setShowFavorites] = useState(false);

  // For demo purposes, let's assume some users are favorites
  const favoriteUsers = nearbyUsers.filter((user, index) => index % 3 === 0);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const displayedUsers = showFavorites ? favoriteUsers : nearbyUsers;

  return (
    <div className="min-h-screen bg-black pb-20">
      <HomeHeader 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onToggleSidebar={toggleSidebar}
      />

      <UserGrid 
        users={displayedUsers} 
        onUserSelect={handleUserCardClick} 
      />

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
      
      <BottomNavBar 
        activeTab={showFavorites ? "favorites" : "explore"} 
        onFavoritesClick={toggleFavorites} 
      />
      <Toaster />
    </div>
  );
};

export default Index;
