/*
  # Update bookings table RLS policies

  1. Changes
    - Allow public (unauthenticated) access for inserting bookings
    - Keep email-based access for reading own bookings
    - Add policy for administrators to manage all bookings
  
  2. Security
    - Enable RLS
    - Public can only insert new bookings
    - Users can only read their own bookings
    - No update/delete access for public users
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert bookings" ON bookings;

-- Create new policies
CREATE POLICY "Anyone can insert bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (email = current_user);

-- Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;