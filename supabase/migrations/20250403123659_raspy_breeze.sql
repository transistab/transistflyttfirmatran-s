/*
  # Create bookings table with customer information

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `status` (text)
      - `customer_name` (text)
      - `email` (text)
      - `customer_phone` (text)
      - `move_date` (date)
      - `move_from` (text)
      - `move_to` (text)
      - `property_size` (text)
      - `floor_from` (integer)
      - `floor_to` (integer)
      - `elevator_from` (boolean)
      - `elevator_to` (boolean)
      - `additional_services` (text array)
      - `special_items` (text array)
      - `estimated_volume` (numeric)
      - `notes` (text)
      - `price_quote` (numeric)
      - `admin_notes` (text)

  2. Security
    - Enable RLS
    - Allow public to insert bookings
    - Allow users to read their own bookings
*/

-- Create the bookings table if it doesn't exist
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  customer_name text NOT NULL,
  email text NOT NULL,
  customer_phone text NOT NULL,
  move_date date NOT NULL,
  move_from text NOT NULL,
  move_to text NOT NULL,
  property_size text NOT NULL,
  floor_from integer NOT NULL,
  floor_to integer NOT NULL,
  elevator_from boolean DEFAULT false,
  elevator_to boolean DEFAULT false,
  additional_services text[],
  special_items text[],
  estimated_volume numeric,
  notes text,
  price_quote numeric,
  admin_notes text
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert bookings" ON bookings;
  DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

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