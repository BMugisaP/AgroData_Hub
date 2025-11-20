import { supabase } from './supabase';

export async function signUpFarmer(email: string, password: string, fullName: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          full_name: fullName,
        });

      if (profileError) throw profileError;

      // Assign farmer role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'farmer',
        });

      if (roleError) throw roleError;

      return { success: true, user: authData.user };
    }
  } catch (error) {
    return { success: false, error };
  }
}

export async function signUpAdmin(email: string, password: string, fullName: string, adminCode: string) {
  const correctAdminCode = import.meta.env.VITE_ADMIN_CODE || 'admin2024';

  if (adminCode !== correctAdminCode) {
    return { success: false, error: 'Invalid admin code' };
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          full_name: fullName,
        });

      if (profileError) throw profileError;

      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'admin',
        });

      if (roleError) throw roleError;

      return { success: true, user: authData.user };
    }
  } catch (error) {
    return { success: false, error };
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    return { success: false, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getUserRole(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data?.role || 'farmer';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'farmer';
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
