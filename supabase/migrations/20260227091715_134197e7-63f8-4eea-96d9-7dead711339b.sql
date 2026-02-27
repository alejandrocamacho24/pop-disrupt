
-- Create Pre Flavor rankings table (main page)
CREATE TABLE public.pre_flavor_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  rankings JSONB NOT NULL
);

ALTER TABLE public.pre_flavor_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert pre flavor rankings" ON public.pre_flavor_rankings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read pre flavor rankings" ON public.pre_flavor_rankings FOR SELECT USING (true);

-- Create Post Flavor rankings table (ranking page)
CREATE TABLE public.post_flavor_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  rankings JSONB NOT NULL
);

ALTER TABLE public.post_flavor_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert post flavor rankings" ON public.post_flavor_rankings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read post flavor rankings" ON public.post_flavor_rankings FOR SELECT USING (true);

-- Migrate existing data
INSERT INTO public.pre_flavor_rankings (id, created_at, rankings)
SELECT id, created_at, rankings FROM public.flavor_rankings WHERE source = 'main';

INSERT INTO public.post_flavor_rankings (id, created_at, rankings)
SELECT id, created_at, rankings FROM public.flavor_rankings WHERE source = 'ranking';
