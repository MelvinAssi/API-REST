CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_is_admin ON users(is_admin);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_recipes_user_id ON recipes(user_id);



INSERT INTO users (username, email, password, is_admin)
VALUES 
  ('Melvin', 'melvinassi@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$/eyhc6WojGZlFOAs+/rD3Q$MwITe7BeuqDwZDt3Lnca6ZX0m/uD8YIaQAerwKLSQvk', TRUE);
