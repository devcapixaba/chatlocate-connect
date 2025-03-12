
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqfsohxbafdcjwbheuwi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZnNvaHhiYWZkY2p3YmhldXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODYyOTAsImV4cCI6MjA1Njk2MjI5MH0.XURQOl1PB0DFjgD6ZPBx-wEIysxaoqYg6M6BoGFlEmg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string | null;
  avatar: string | null;
  status: string | null;
  height: number | null;
  online: boolean;
  last_online: string;
  latitude: number | null;
  longitude: number | null;
  
  // Campos de perfil
  bio: string | null;
  tags: string | null;
  show_age: boolean | null;
  age: number | null;
  weight: number | null;
  body_type: string | null;
  position: string | null;
  ethnicity: string | null;
  relationship: string | null;
  
  // Redes sociais
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  spotify: string | null;
  
  // Fotos
  photos: string[] | null;
}

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}
