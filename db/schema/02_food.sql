DROP TABLE IF EXISTS food CASCADE;
CREATE TABLE food (
  id SERIAL PRIMARY KEY NOT NULL,
  image IMAGE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL
);

