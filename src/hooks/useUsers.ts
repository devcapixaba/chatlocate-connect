
import { useState, useEffect } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function useUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
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
        
        setUsers(data as Profile[]);
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
  }, [user]);
  
  return { users, loading };
}
