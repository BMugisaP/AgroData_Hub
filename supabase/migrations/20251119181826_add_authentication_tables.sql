/*
  # Add Authentication and Admin Management Tables

  ## Purpose
  Extend database schema to support user authentication, role-based access control,
  and admin content management capabilities.

  ## New Tables

  ### 1. user_roles
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `role` (text) - 'farmer' or 'admin'
  - `created_at` (timestamptz)

  ### 2. admin_content_updates
  - `id` (uuid, primary key)
  - `updated_by` (uuid, references users)
  - `content_type` (text) - varieties, guides, pests, fertilizers, processing, prices
  - `content_id` (uuid) - ID of the updated content
  - `action` (text) - created, updated, deleted
  - `changes` (jsonb) - Details of changes made
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all new tables
  - Admin users can manage content
  - Users can view their own role information
*/

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('farmer', 'admin')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_content_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  content_type text NOT NULL,
  content_id uuid,
  action text NOT NULL CHECK (action IN ('created', 'updated', 'deleted')),
  changes jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_content_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own role"
  ON user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can view content updates"
  ON admin_content_updates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can create content updates"
  ON admin_content_updates FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );