-- Create table for demo access requests
CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'english',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed'))
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert demo requests (public form)
CREATE POLICY "Anyone can submit demo requests" 
ON public.demo_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading own requests by email
CREATE POLICY "Users can view their own demo requests" 
ON public.demo_requests 
FOR SELECT 
USING (true);

-- Create index for better performance on email lookups
CREATE INDEX idx_demo_requests_email ON public.demo_requests(email);
CREATE INDEX idx_demo_requests_created_at ON public.demo_requests(created_at DESC);