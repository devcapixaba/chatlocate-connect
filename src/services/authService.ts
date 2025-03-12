
import { supabase, Profile } from '@/lib/supabase';
import { getUserLocation, updateUserLocation } from '@/utils/authUtils';

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
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
    console.error('Error in fetchUserProfile:', error);
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

export const updateUserProfileData = async (userId: string, data: Partial<Profile>) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
    
    return await fetchUserProfile(userId);
  } catch (error) {
    console.error("Error in updateUserProfileData:", error);
    throw error;
  }
};

export const createInitialProfile = async (userId: string, name: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          online: true,
        },
      ]);

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in createInitialProfile:', error);
    throw error;
  }
};

export const updateLocationOnLogin = async (userId: string) => {
  try {
    const location = await getUserLocation();
    await updateUserLocation(userId, location.latitude, location.longitude);
    return location;
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};
