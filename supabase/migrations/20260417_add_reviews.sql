CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT review_one_target CHECK (
    (product_id IS NOT NULL AND store_id IS NULL) OR
    (product_id IS NULL AND store_id IS NOT NULL)
  ),
  CONSTRAINT review_unique_user_product UNIQUE (user_id, product_id),
  CONSTRAINT review_unique_user_store UNIQUE (user_id, store_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews (product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_store_id ON reviews (store_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews (user_id);

ALTER TABLE products ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2);
ALTER TABLE stores ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET
    average_rating = (
      SELECT ROUND(AVG(rating)::NUMERIC, 2)
      FROM reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_store_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stores
  SET
    average_rating = (
      SELECT ROUND(AVG(rating)::NUMERIC, 2)
      FROM reviews
      WHERE store_id = COALESCE(NEW.store_id, OLD.store_id)
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE store_id = COALESCE(NEW.store_id, OLD.store_id)
    )
  WHERE id = COALESCE(NEW.store_id, OLD.store_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_product_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
WHEN (NEW.product_id IS NOT NULL OR OLD.product_id IS NOT NULL)
EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER trg_update_store_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
WHEN (NEW.store_id IS NOT NULL OR OLD.store_id IS NOT NULL)
EXECUTE FUNCTION update_store_rating();
