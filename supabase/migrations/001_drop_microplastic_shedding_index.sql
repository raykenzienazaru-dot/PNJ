-- Drops microplastic_shedding_index: the Roboflow "fabric-defect-detection"
-- model only returns defect bounding boxes (class + confidence + geometry),
-- it does not measure microplastic shedding, so this column no longer
-- reflects anything the app computes. Safe to run on an existing database;
-- fabric_durability_index and all other columns are untouched.
alter table public.fabric_analyses
  drop column if exists microplastic_shedding_index;
