
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

export const updateUserLocation = async (userId: string, latitude: number, longitude: number) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        latitude,
        longitude
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating location:', error);
    }
  } catch (error) {
    console.error('Error in updateUserLocation:', error);
  }
};

// Function to get user's current location
export const getUserLocation = (): Promise<{latitude: number, longitude: number}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to São Paulo coordinates if we can't get location
          resolve({
            latitude: -23.550520,
            longitude: -46.633309
          });
        }
      );
    }
  });
};
