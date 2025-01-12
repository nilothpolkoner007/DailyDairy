import { supabase } from './supabase';

export const profileApi = {
  // Fetch user profile
  async getProfile() {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (error) throw error;
    return data;
  },

  // Update user profile
  async updateProfile(updates) {
    const { data, error } = await supabase.from('profiles').update(updates).single();
    if (error) throw error;
    return data;
  },

  // Upload avatar and update profile with new avatar URL
  async uploadAvatar(file) {
    const filePath = `avatars/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('user-uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('user-uploads').getPublicUrl(filePath);

    // Update profile with new avatar URL
    return this.updateProfile({ avatar_url: publicUrl });
  },
};
