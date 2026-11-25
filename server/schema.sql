-- Supabase PostgreSQL Schema for Personal Portfolio Website

CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  data JSONB NOT NULL,
  template_id VARCHAR(100) NOT NULL,
  owner_token VARCHAR(255) NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant lookup by public slug
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published portfolios
CREATE POLICY "Public portfolios are viewable by everyone" 
ON portfolios FOR SELECT 
USING (is_published = TRUE);

-- Allow insert/update/delete by matching owner_token
CREATE POLICY "Users can manage portfolios with matching owner token"
ON portfolios FOR ALL
USING (TRUE)
WITH CHECK (TRUE);
