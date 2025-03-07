
import { useState, useEffect } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function useUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', user.id)
          .order('online', { ascending: false })
          .order('last_online', { ascending: false });
        
        if (error) {
          console.error('Error fetching users:', error);
          return;
        }
        
        let usersList = data as Profile[];
        
        // Sort by distance if current user has location data
        if (profile?.latitude && profile?.longitude) {
          usersList = usersList.map(u => {
            // Calculate rough distance if both users have coordinates
            if (u.latitude && u.longitude && profile.latitude && profile.longitude) {
              const distance = calculateDistance(
                profile.latitude, 
                profile.longitude, 
                u.latitude, 
                u.longitude
              );
              return { ...u, distance };
            }
            return { ...u, distance: 9999 }; // Put users without location at the end
          }).sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
        }
        
        setUsers(usersList);
      } catch (error) {
        console.error('Error in fetchUsers:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
    
    // Set up real-time subscription for profile changes
    const channel = supabase
      .channel('profiles-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        () => {
          fetchUsers();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, profile]);
  
  // Helper function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };
  
  return { users, loading };
}
