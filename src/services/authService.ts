import supabase from './supabase';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthError {
  message: string;
}

// Register a new user
export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Registration failed');

    // Create a profile record
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      created_at: new Date().toISOString(),
    });

    if (profileError) throw profileError;

    // Return the user data
    const user: User = {
      id: authData.user.id,
      email: authData.user.email || '',
      firstName,
      lastName,
      createdAt: authData.user.created_at,
    };

    return { user, error: null };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      user: null,
      error: { message: error.message || 'Registration failed' },
    };
  }
};

// Login a user
export const login = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Login failed');

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    // Return the user data
    const user: User = {
      id: authData.user.id,
      email: authData.user.email || '',
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      createdAt: authData.user.created_at,
    };

    return { user, error: null };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      user: null,
      error: { message: error.message || 'Login failed' },
    };
  }
};

// Logout the current user
export const logout = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { error: { message: error.message || 'Logout failed' } };
  }
};

// Get the current logged in user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      return null;
    }
    
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      return null;
    }
    
    // Get profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();
    
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return null;
    }
    
    return {
      id: userData.user.id,
      email: userData.user.email || '',
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      createdAt: userData.user.created_at,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Update user profile
export const updateProfile = async (
  userId: string,
  updates: { firstName?: string; lastName?: string; avatar?: string }
): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    const updateData: any = {};
    if (updates.firstName) updateData.first_name = updates.firstName;
    if (updates.lastName) updateData.last_name = updates.lastName;
    if (updates.avatar) updateData.avatar_url = updates.avatar;

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) throw error;

    // Get the updated profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    // Get the user data
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) throw new Error('User not found');

    // Return the updated user
    const user: User = {
      id: userId,
      email: userData.user.email || '',
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      createdAt: userData.user.created_at,
    };

    return { user, error: null };
  } catch (error: any) {
    console.error('Profile update error:', error);
    return {
      user: null,
      error: { message: error.message || 'Profile update failed' },
    };
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return { error: { message: error.message || 'Password reset failed' } };
  }
};

// Update password
export const updatePassword = async (password: string): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Password update error:', error);
    return { error: { message: error.message || 'Password update failed' } };
  }
}; 