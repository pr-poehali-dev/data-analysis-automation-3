CREATE TABLE blog (
    id serial PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    date date NOT NULL DEFAULT CURRENT_DATE,
    created_at timestamp DEFAULT now(),
    publish_at timestamp,
    image_url text
);