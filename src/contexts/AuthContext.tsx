import { createContext, useState, useEffect } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, updateUserOnlineStatus, getUserLocation, updateUserLocation } from '@/utils/authUtils';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth and check for existing session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        console.log('Initializing auth and checking for session...');
        
        // Get current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        if (data?.session) {
          console.log('Session found, setting user data');
          setUser(data.session.user);
          
          try {
            const profileData = await fetchProfile(data.session.user.id);
            if (profileData) {
              setProfile(profileData);
              
              // Update user's location when they log in
              try {
                const location = await getUserLocation();
                await updateUserLocation(data.session.user.id, location.latitude, location.longitude);
                
                // Update the profile with location data
                setProfile(prev => prev ? { ...prev, ...location } : null);
              } catch (locationError) {
                console.error('Error updating location:', locationError);
              }
            } else {
              console.log('No profile found for user', data.session.user.id);
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
          }
        } else {
          console.log('No session found');
        }
      } catch (initError) {
        console.error('Error during auth initialization:', initError);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          
          try {
            const profileData = await fetchProfile(session.user.id);
            if (profileData) {
              setProfile(profileData);
              
              // Update user's location when they log in
              try {
                const location = await getUserLocation();
                await updateUserLocation(session.user.id, location.latitude, location.longitude);
                
                // Update the profile with location data
                setProfile(prev => prev ? { ...prev, ...location } : null);
              } catch (locationError) {
                console.error('Error updating location:', locationError);
              }
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
          } finally {
            // Make sure to set loading to false after sign in is complete
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED') {
          // Handle token refresh events
          if (session) {
            setUser(session.user);
            setLoading(false);
          }
        } else {
          // For other events, ensure loading is false
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Erro ao fazer login',
          description: error.message,
          variant: 'destructive',
        });
        setLoading(false); // Ensure loading is false on error
        return;
      }

      // Update online status
      if (data.user) {
        await updateUserOnlineStatus(data.user.id, true);
      }

      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      });
      setLoading(false); // Ensure loading is false on error
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Erro ao criar conta',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        // Create initial profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
              online: true,
            },
          ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      toast({
        title: 'Conta criada com sucesso',
        description: 'Você foi logado automaticamente.',
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Update online status before signing out
      if (user) {
        await updateUserOnlineStatus(user.id, false);
      }
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: 'Erro ao fazer logout',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer logout',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        toast({
          title: 'Erro ao atualizar perfil',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Refresh profile data
      const profileData = await fetchProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
      
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const value = {
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
