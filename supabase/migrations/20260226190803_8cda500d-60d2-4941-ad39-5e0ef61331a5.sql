
-- Table for flavor ranking submissions
CREATE TABLE public.flavor_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rankings JSONB NOT NULL, -- array of {flavor_id, rank, comment}
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.flavor_rankings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit rankings
CREATE POLICY "Anyone can insert rankings"
  ON public.flavor_rankings FOR INSERT
  WITH CHECK (true);

-- Anyone can read rankings (for admin dashboard - no auth in this app)
CREATE POLICY "Anyone can read rankings"
  ON public.flavor_rankings FOR SELECT
  USING (true);

-- Table for flavor suggestions
CREATE TABLE public.flavor_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.flavor_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert suggestions"
  ON public.flavor_suggestions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read suggestions"
  ON public.flavor_suggestions FOR SELECT
  USING (true);
