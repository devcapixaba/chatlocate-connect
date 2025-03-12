
import { supabase } from '@/lib/supabase';

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

// Update user location in database
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
