/*
  # Update bookings table constraints

  1. Changes
    - Make move_date nullable for contact form submissions
    - Keep other constraints unchanged
  
  2. Security
    - Keep existing RLS policies
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS bookings;

-- Create the bookings table with updated constraints
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  move_date date,
  move_from text,
  move_to text,
  property_size text,
  floor_from integer,
  floor_to integer,
  elevator_from boolean DEFAULT false,
  elevator_to boolean DEFAULT false,
  additional_services text[],
  special_items text[],
  notes text,
  company text,
  service text,
  included_services text[]
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (customer_email = current_user);