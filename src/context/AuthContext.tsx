import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { User } from '../services/authService';
import supabase from '../services/supabase';

// Define the context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ error: null }),
  register: async () => ({ error: null }),
  logout: async () => {},
  updateUser: () => {}
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is already logged in
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
        }
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
              // Get user profile after sign in
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (profile) {
                const userData: User = {
                  id: session.user.id,
                  email: session.user.email || '',
                  firstName: profile.first_name,
                  lastName: profile.last_name,
                  avatar: profile.avatar_url,
                  createdAt: session.user.created_at
                };
                
                setUser(userData);
              }
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login handler
  const login = async (email: string, password: string) => {
    try {
      const { user: userData, error } = await authService.login(email, password);
      
      if (error) {
        return { error: error.message };
      }
      
      if (userData) {
        setUser(userData);
      }
      
      return { error: null };
    } catch (error: any) {
      return { error: error.message || 'Login failed' };
    }
  };

  // Register handler
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { user: userData, error } = await authService.register(email, password, firstName, lastName);
      
      if (error) {
        return { error: error.message };
      }
      
      if (userData) {
        setUser(userData);
      }
      
      return { error: null };
    } catch (error: any) {
      return { error: error.message || 'Registration failed' };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user data
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  // Provide the context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 