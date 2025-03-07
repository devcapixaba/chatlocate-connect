
import { supabase, Profile } from '@/lib/supabase';

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error('Error in fetchProfile:', error);
    return null;
  }
};

export const updateUserOnlineStatus = async (userId: string, status: boolean) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        online: status,
        ...(status === false ? { last_online: new Date().toISOString() } : {})
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating online status:', error);
    }
  } catch (error) {
    console.error('Error in updateUserOnlineStatus:', error);
  }
};
