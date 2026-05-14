-- Step 1: Add a search vector column
ALTER TABLE prompts ADD COLUMN search_vector tsvector;

-- Step 2: Populate it from your columns
UPDATE prompts SET search_vector = 
  to_tsvector('english', 
    coalesce(title, '') || ' ' || 
    coalesce(description, '') || ' ' || 
    coalesce(prompt, '') || ' ' ||
    coalesce(category, '') || ' ' ||
    coalesce(array_to_string(tags, ' '), '')
  );

-- Step 3: Index it for speed
CREATE INDEX prompts_search_idx ON prompts USING GIN(search_vector);

-- Step 4: Auto-update on insert/update
CREATE OR REPLACE FUNCTION update_search_vector_func() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    coalesce(NEW.title, '') || ' ' || 
    coalesce(NEW.description, '') || ' ' || 
    coalesce(NEW.prompt, '') || ' ' ||
    coalesce(NEW.category, '') || ' ' ||
    coalesce(array_to_string(NEW.tags, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_search_vector
BEFORE INSERT OR UPDATE ON prompts
FOR EACH ROW EXECUTE FUNCTION update_search_vector_func();

-- Step 5: Supabase RPC function for querying
CREATE OR REPLACE FUNCTION search_prompts(query_text text, category_boost text DEFAULT NULL)
RETURNS SETOF prompts
LANGUAGE sql AS $$
  SELECT 
    *
  FROM prompts
  WHERE search_vector @@ to_tsquery('english', query_text)
     OR category = category_boost  -- always include category match even if no text match
  ORDER BY 
    ts_rank(search_vector, to_tsquery('english', query_text)) +
    CASE WHEN category = category_boost THEN 2.0 ELSE 0 END DESC
  LIMIT 50;
$$;
