import { supabase } from './supabase';

export const diaryApi = {
  // Fetch diary entries
  async getDiaryEntries(options = {}) {
    const { page = 1, limit = 10 } = options;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from('diary_entries')
      .select('*, photos(*)')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return data;
  },

  // Create a diary entry
  async createDiaryEntry(entry) {
    const { data, error } = await supabase
      .from('diary_entries')
      .insert([entry])
      .select('*, photos(*)')
      .single();

    if (error) throw error;
    return data;
  },

  // Update a diary entry
  async updateDiaryEntry(id, updates) {
    const { data, error } = await supabase
      .from('diary_entries')
      .update(updates)
      .eq('id', id)
      .select('*, photos(*)')
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a diary entry
  async deleteDiaryEntry(id) {
    const { error } = await supabase.from('diary_entries').delete().eq('id', id);

    if (error) throw error;
  },
};
