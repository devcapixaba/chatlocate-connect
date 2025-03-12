
import { createContext } from 'react';
import { Profile } from '@/lib/supabase';

export interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
