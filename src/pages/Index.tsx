
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
    status: "Looking for friends! 🏃‍♀️",
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    distance: 1.2,
    status: "Coffee enthusiast ☕",
  },
  {
    id: "3",
    name: "Carol White",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    distance: 2.1,
    status: "New to the area! 👋",
  },
];

const Index = () => {
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

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

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-4">
      <div className="max-w-4xl mx-auto">
        {!userLocation ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
            <h1 className="text-4xl font-bold text-white">Find People Nearby</h1>
            <p className="text-lg text-gray-400">
              Enable location to see who's around you
            </p>
            <Button
              onClick={requestLocation}
              className="bg-[#403E43] hover:bg-[#403E43]/90 text-white"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Share Location
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {nearbyUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onChat={() => setActiveChatUser(user.name)}
                />
              ))}
            </div>
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
