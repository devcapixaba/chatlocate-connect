
import { useState } from "react";
import { UserCard } from "@/components/UserCard";
import { ChatPanel } from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

// Dummy data for demonstration
const nearbyUsers = [
  {
    id: "1",
    name: "Alice Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    distance: 0.5,
    status: "Looking for hiking partners! 🏃‍♀️",
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    distance: 1.2,
    status: "Coffee enthusiast ☕ Love trying new cafes!",
  },
  {
    id: "3",
    name: "Carol White",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    distance: 2.1,
    status: "New to the area, would love to meet people! 👋",
  },
];

const Index = () => {
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

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

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentUserIndex < nearbyUsers.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="glass-card p-6 rounded-lg text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Find People Nearby</h1>
          <p className="text-lg text-gray-600 mb-6">
            Swipe right to like, left to pass
          </p>
          {!userLocation && (
            <Button
              onClick={requestLocation}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Share Location
            </Button>
          )}
        </div>

        {userLocation && currentUserIndex < nearbyUsers.length && (
          <div className="animate-fade-in pt-4">
            <UserCard
              key={nearbyUsers[currentUserIndex].id}
              user={nearbyUsers[currentUserIndex]}
              onChat={() => setActiveChatUser(nearbyUsers[currentUserIndex].name)}
              onSwipe={handleSwipe}
            />
          </div>
        )}

        {activeChatUser && (
          <ChatPanel
            recipientName={activeChatUser}
            onClose={() => setActiveChatUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
