import { supabase } from './supabase';

export const categoriesApi = {
  // Fetch all categories
  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('name');

    if (error) throw error;
    return data;
  },
};
