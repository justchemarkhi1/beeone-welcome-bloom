-- Add columns to demo_requests table to store generated credentials
ALTER TABLE public.demo_requests 
ADD COLUMN demo_username TEXT,
ADD COLUMN demo_password TEXT;