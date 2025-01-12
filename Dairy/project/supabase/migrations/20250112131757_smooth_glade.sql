/*
  # Initial Schema Setup for Todo and Diary Application

  1. New Tables
    - `users_profiles`
      - Extended user profile information
      - Stores display name and avatar URL
    
    - `tasks`
      - Todo items with priorities and categories
      - Linked to users with RLS
    
    - `diary_entries`
      - Daily diary entries with rich text content
      - Includes mood tracking and timestamps
    
    - `photos`
      - Photo storage with metadata
      - Links to diary entries
    
    - `categories`
      - Task categories (Work, Personal, Shopping, etc.)
      - System-wide categories shared across users

  2. Security
    - Enable RLS on all tables
    - Policies ensure users can only access their own data
*/

-- Create custom types
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE mood_type AS ENUM ('happy', 'sad', 'productive', 'neutral');

-- Create users_profiles table
CREATE TABLE IF NOT EXISTS users_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  priority priority_level DEFAULT 'medium',
  category_id uuid REFERENCES categories(id),
  deadline timestamptz,
  completed boolean DEFAULT false,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  mood mood_type DEFAULT 'neutral',
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  diary_entry_id uuid REFERENCES diary_entries(id) ON DELETE CASCADE,
  url text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own profile"
  ON users_profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Categories are readable by all authenticated users"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own tasks"
  ON tasks
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own diary entries"
  ON diary_entries
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own photos"
  ON photos
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default categories
INSERT INTO categories (name, color) VALUES
  ('Work', '#EF4444'),
  ('Personal', '#3B82F6'),
  ('Shopping', '#10B981'),
  ('Health', '#8B5CF6'),
  ('Education', '#F59E0B');