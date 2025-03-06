
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
    setSidebarOpen
  } = useHomeScreen();

  return (
    <div className="min-h-screen bg-black pb-20">
      <HomeHeader 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onToggleSidebar={toggleSidebar}
      />

      <UserGrid onUserSelect={handleUserCardClick} />

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
