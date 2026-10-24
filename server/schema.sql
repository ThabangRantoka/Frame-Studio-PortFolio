-- Each row represents one photo displayed in the gallery.
CREATE TABLE IF NOT EXISTS photos (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('Portrait', 'Street', 'Landscape')),
  file TEXT NOT NULL UNIQUE,
  alt TEXT NOT NULL
);