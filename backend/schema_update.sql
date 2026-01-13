-- Run this script in your PostgreSQL database to update the schema

ALTER TABLE enquiries
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS location VARCHAR(255),
ADD COLUMN IF NOT EXISTS qualification VARCHAR(255),
ADD COLUMN IF NOT EXISTS course VARCHAR(255),
ADD COLUMN IF NOT EXISTS doubts TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'enquiries';
