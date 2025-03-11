
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Messages from "./pages/Messages";
import ChatScreen from "./pages/ChatScreen";
import NotFound from "./pages/NotFound";
import PremiumPlans from "./pages/PremiumPlans";
import EditProfile from "./pages/EditProfile";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import MyAlbums from "./pages/MyAlbums";
import CreateAlbum from "./pages/CreateAlbum";
import AlbumView from "./pages/AlbumView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/messages/:id" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
              <Route path="/premium" element={<ProtectedRoute><PremiumPlans /></ProtectedRoute>} />
              <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/albums" element={<ProtectedRoute><MyAlbums /></ProtectedRoute>} />
              <Route path="/albums/create" element={<ProtectedRoute><CreateAlbum /></ProtectedRoute>} />
              <Route path="/albums/:id" element={<ProtectedRoute><AlbumView /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
