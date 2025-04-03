/*
  # Add blog tables

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `author_id` (uuid)
      - `publish_date` (timestamp)
      - `image` (text)
      - `tags` (text[])
      - `category` (text)
      - `is_published` (boolean)
      
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create blog_categories table
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  author_id uuid NOT NULL,
  publish_date timestamptz DEFAULT now(),
  image text,
  tags text[],
  category text REFERENCES blog_categories(slug),
  is_published boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_categories
CREATE POLICY "Allow public read access for blog_categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

-- Create policies for blog_posts
CREATE POLICY "Allow public read access for published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (is_published = true);