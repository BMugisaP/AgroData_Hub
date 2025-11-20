/*
  # Cassava Agricultural Management System Database Schema

  ## Overview
  Complete database schema for a cassava-focused agricultural web system including varieties,
  farming guides, pest management, market data, and farm records.

  ## New Tables

  ### 1. cassava_varieties
  - `id` (uuid, primary key)
  - `name` (text, not null) - Variety name
  - `type` (text, not null) - Sweet/Bitter
  - `description` (text)
  - `yield_rate` (text) - Expected yield per acre
  - `maturity_period` (text) - Time to harvest
  - `suitable_soil` (text)
  - `is_disease_resistant` (boolean)
  - `is_drought_tolerant` (boolean)
  - `image_url` (text)
  - `created_at` (timestamptz)

  ### 2. farming_guides
  - `id` (uuid, primary key)
  - `category` (text, not null) - land_preparation, planting, crop_management, etc.
  - `title` (text, not null)
  - `content` (text, not null)
  - `order_index` (integer)
  - `image_url` (text)
  - `created_at` (timestamptz)

  ### 3. pests_diseases
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `type` (text, not null) - pest or disease
  - `symptoms` (text)
  - `control_measures` (text)
  - `prevention` (text)
  - `image_url` (text)
  - `severity_level` (text)
  - `created_at` (timestamptz)

  ### 4. market_prices
  - `id` (uuid, primary key)
  - `product_type` (text, not null) - fresh roots, flour, chips, etc.
  - `price_per_kg` (decimal)
  - `region` (text)
  - `market_name` (text)
  - `date` (date, not null)
  - `created_at` (timestamptz)

  ### 5. users
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `phone` (text)
  - `location` (text)
  - `farm_size` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. farm_records
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users)
  - `variety_id` (uuid, references cassava_varieties)
  - `planting_date` (date)
  - `expected_harvest_date` (date)
  - `actual_harvest_date` (date)
  - `field_size` (text)
  - `yield_amount` (text)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. farm_expenses
  - `id` (uuid, primary key)
  - `farm_record_id` (uuid, references farm_records)
  - `user_id` (uuid, references users)
  - `expense_type` (text) - seeds, fertilizer, labor, etc.
  - `amount` (decimal)
  - `date` (date)
  - `description` (text)
  - `created_at` (timestamptz)

  ### 8. farm_sales
  - `id` (uuid, primary key)
  - `farm_record_id` (uuid, references farm_records)
  - `user_id` (uuid, references users)
  - `quantity_sold` (text)
  - `price_per_unit` (decimal)
  - `total_amount` (decimal)
  - `buyer_name` (text)
  - `sale_date` (date)
  - `created_at` (timestamptz)

  ### 9. fertilizers
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `type` (text) - NPK, Organic, etc.
  - `application_method` (text)
  - `recommended_quantity` (text)
  - `application_timing` (text)
  - `benefits` (text)
  - `created_at` (timestamptz)

  ### 10. processing_methods
  - `id` (uuid, primary key)
  - `method_name` (text, not null)
  - `product_output` (text) - flour, gari, starch, etc.
  - `description` (text)
  - `steps` (text)
  - `equipment_needed` (text)
  - `processing_time` (text)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for reference data (varieties, guides, pests, fertilizers, processing methods)
  - Authenticated users can manage their own farm records, expenses, and sales
  - Only authenticated users can view market prices
*/

-- Create tables
CREATE TABLE IF NOT EXISTS cassava_varieties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  yield_rate text,
  maturity_period text,
  suitable_soil text,
  is_disease_resistant boolean DEFAULT false,
  is_drought_tolerant boolean DEFAULT false,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS farming_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  order_index integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pests_diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('pest', 'disease')),
  symptoms text,
  control_measures text,
  prevention text,
  image_url text,
  severity_level text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS market_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type text NOT NULL,
  price_per_kg decimal(10,2),
  region text,
  market_name text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  location text,
  farm_size text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS farm_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  variety_id uuid REFERENCES cassava_varieties(id),
  planting_date date,
  expected_harvest_date date,
  actual_harvest_date date,
  field_size text,
  yield_amount text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS farm_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_record_id uuid REFERENCES farm_records(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  expense_type text NOT NULL,
  amount decimal(10,2) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS farm_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_record_id uuid REFERENCES farm_records(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  quantity_sold text,
  price_per_unit decimal(10,2),
  total_amount decimal(10,2) NOT NULL,
  buyer_name text,
  sale_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fertilizers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text,
  application_method text,
  recommended_quantity text,
  application_timing text,
  benefits text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS processing_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  method_name text NOT NULL,
  product_output text,
  description text,
  steps text,
  equipment_needed text,
  processing_time text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cassava_varieties ENABLE ROW LEVEL SECURITY;
ALTER TABLE farming_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE pests_diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertilizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cassava_varieties (public read)
CREATE POLICY "Anyone can view cassava varieties"
  ON cassava_varieties FOR SELECT
  TO public
  USING (true);

-- RLS Policies for farming_guides (public read)
CREATE POLICY "Anyone can view farming guides"
  ON farming_guides FOR SELECT
  TO public
  USING (true);

-- RLS Policies for pests_diseases (public read)
CREATE POLICY "Anyone can view pests and diseases"
  ON pests_diseases FOR SELECT
  TO public
  USING (true);

-- RLS Policies for market_prices (authenticated read)
CREATE POLICY "Authenticated users can view market prices"
  ON market_prices FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for farm_records
CREATE POLICY "Users can view own farm records"
  ON farm_records FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own farm records"
  ON farm_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own farm records"
  ON farm_records FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own farm records"
  ON farm_records FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for farm_expenses
CREATE POLICY "Users can view own expenses"
  ON farm_expenses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON farm_expenses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON farm_expenses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON farm_expenses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for farm_sales
CREATE POLICY "Users can view own sales"
  ON farm_sales FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sales"
  ON farm_sales FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sales"
  ON farm_sales FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sales"
  ON farm_sales FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for fertilizers (public read)
CREATE POLICY "Anyone can view fertilizers"
  ON fertilizers FOR SELECT
  TO public
  USING (true);

-- RLS Policies for processing_methods (public read)
CREATE POLICY "Anyone can view processing methods"
  ON processing_methods FOR SELECT
  TO public
  USING (true);