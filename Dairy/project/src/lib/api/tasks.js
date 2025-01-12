import { supabase } from './supabase';

export const tasksApi = {
  // Fetch all tasks for the current user
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, categories(*)')
      .order('position');

    if (error) throw error;
    return data;
  },

  // Create a new task
  async createTask(task) {
    // Get the highest position number
    const { data: lastTask, error: lastTaskError } = await supabase
      .from('tasks')
      .select('position')
      .order('position', { ascending: false })
      .limit(1);

    if (lastTaskError) throw lastTaskError;

    const newPosition = lastTask?.[0]?.position ?? 0;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task, position: newPosition + 1 }])
      .select('*, categories(*)')
      .single();

    if (error) throw error;
    return data;
  },

  // Update a task
  async updateTask(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select('*, categories(*)')
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a task
  async deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) throw error;
  },

  // Reorder tasks
  async reorderTasks(taskIds) {
    const updates = taskIds.map((id, index) => ({
      id,
      position: index + 1,
    }));

    const { error } = await supabase.from('tasks').upsert(updates, {
      onConflict: ['id'],
    });

    if (error) throw error;
  },
};
