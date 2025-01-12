import { supabase } from './supabase';

export const photosApi = {
  // Upload a photo
  async uploadPhoto(file, diaryEntryId) {
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('user-uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('user-uploads').getPublicUrl(filePath);

    // Create photo record in the database
    const { data, error } = await supabase
      .from('photos')
      .insert([
        {
          url: publicUrl,
          diary_entry_id: diaryEntryId,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a photo
  async deletePhoto(id) {
    // Get the photo record first
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Extract file path from URL
    const filePath = photo.url.split('/').pop();

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('user-uploads')
      .remove([`photos/${filePath}`]);

    if (storageError) throw storageError;

    // Delete database record
    const { error } = await supabase.from('photos').delete().eq('id', id);

    if (error) throw error;
  },
};
