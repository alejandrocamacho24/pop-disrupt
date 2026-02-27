
-- Add individual rank columns to pre_flavor_rankings
ALTER TABLE public.pre_flavor_rankings
  ADD COLUMN rank_1_name text,
  ADD COLUMN rank_1_comment text,
  ADD COLUMN rank_2_name text,
  ADD COLUMN rank_2_comment text,
  ADD COLUMN rank_3_name text,
  ADD COLUMN rank_3_comment text,
  ADD COLUMN rank_4_name text,
  ADD COLUMN rank_4_comment text,
  ADD COLUMN rank_5_name text,
  ADD COLUMN rank_5_comment text,
  ADD COLUMN rank_6_name text,
  ADD COLUMN rank_6_comment text,
  ADD COLUMN rank_7_name text,
  ADD COLUMN rank_7_comment text,
  ADD COLUMN rank_8_name text,
  ADD COLUMN rank_8_comment text;

-- Add individual rank columns to post_flavor_rankings
ALTER TABLE public.post_flavor_rankings
  ADD COLUMN rank_1_name text,
  ADD COLUMN rank_1_comment text,
  ADD COLUMN rank_2_name text,
  ADD COLUMN rank_2_comment text,
  ADD COLUMN rank_3_name text,
  ADD COLUMN rank_3_comment text,
  ADD COLUMN rank_4_name text,
  ADD COLUMN rank_4_comment text,
  ADD COLUMN rank_5_name text,
  ADD COLUMN rank_5_comment text,
  ADD COLUMN rank_6_name text,
  ADD COLUMN rank_6_comment text,
  ADD COLUMN rank_7_name text,
  ADD COLUMN rank_7_comment text,
  ADD COLUMN rank_8_name text,
  ADD COLUMN rank_8_comment text;
