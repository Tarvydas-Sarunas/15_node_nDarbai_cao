-- Create posts table

CREATE TABLE posts 
(
  post_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  title VARCHAR(255) NOT NULL, 
  author VARCHAR(255) NOT NULL, 
  date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  body TEXT NOT NULL, 
  PRIMARY KEY (post_id)
) ENGINE = InnoDB;

-- Add all posts
INSERT INTO posts (title, author, date, body) VALUES
('Post 1', 'James Band', '2023-12-20', 'This is body of Post 1'),
('Post 2', 'Jane Dow', '2023-12-01', 'Body of post 2'),
('POST 3', 'James Band', '2023-12-04', 'Body about post 3'),
('Post 4', 'Mike T', '2023-12-14', 'Post about Boxing from T. '),
('Post 5', 'Mike T', '2023-12-15', 'Post about Boxing from T. '),
('Post 6', 'Jane Dow', '2023-11-05', 'Post 6 about Jane');

-- Create one post
INSERT INTO posts 
  (title, author, date, body) 
  VALUES ('Post 5', 'Mike T', '2023-12-15', 'Post about Boxing from T. ');

