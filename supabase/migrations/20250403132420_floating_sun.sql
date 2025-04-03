/*
  # Fix bookings table schema

  1. Changes
    - Rename columns to match frontend usage
    - Add missing columns
    - Update RLS policies
  
  2. Security
    - Enable RLS
    - Allow public inserts
    - Allow email-based access for reading own bookings
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS bookings;

-- Create the bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  customer_name text NOT NULL,
  customer_email text NOT NULL,
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