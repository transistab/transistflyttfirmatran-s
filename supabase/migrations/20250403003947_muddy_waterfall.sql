/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `name` (text)
      - `email` (text)
      - `company` (text, nullable)
      - `service` (text)
      - `included_services` (text array)
      - `additional_info` (text)
      - `status` (text)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for authenticated users to read their own bookings
    - Add policy for authenticated users to insert bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text NOT NULL,
  included_services text[],
  additional_info text,
  status text DEFAULT 'pending'
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can insert bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);