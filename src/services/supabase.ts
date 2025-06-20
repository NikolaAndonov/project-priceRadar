import { createClient } from '@supabase/supabase-js';

// These values should be stored in environment variables in a production app
// For development, we'll hardcode them temporarily
const supabaseUrl = 'https://ihqqogvgjchfoeworvxv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocXFvZ3ZnamNoZm9ld29ydnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTkwOTksImV4cCI6MjA2NTkzNTA5OX0.1jpJFJuY84sbGX8BtBRR8HtgWZ0p9CDfr4oWeXw7Wbs';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your configuration.');
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

// Database types based on Supabase tables
export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  description?: string;
  image_url: string;
  category_id: string;
  unit: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  parent_id?: string;
  image_url?: string;
};

export type Store = {
  id: string;
  name: string;
  logo_url?: string;
};

export type Price = {
  id: string;
  product_id: string;
  store_id: string;
  current_price: number;
  original_price: number;
  discount_percentage: number;
  in_stock: boolean;
  last_checked: string;
  created_at: string;
  updated_at: string;
};

export type PriceHistory = {
  id: string;
  product_id: string;
  store_id: string;
  price: number;
  date: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export type PriceAlert = {
  id: string;
  user_id: string;
  product_id: string;
  target_price: number;
  is_active: boolean;
  notification_method: 'email' | 'push' | 'both';
  created_at: string;
}; 