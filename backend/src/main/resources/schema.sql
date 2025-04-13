CREATE TABLE IF NOT EXISTS member (
    member_num INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(255) NOT NULL,
    member_pw VARCHAR(255) NOT NULL,
    member_name VARCHAR(255),
    member_tel VARCHAR(20),
    member_addr TEXT,
    pw_question VARCHAR(255),
    pw_answer VARCHAR(255),
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    member_id VARCHAR(255),
    profile_id INT,
    nickname VARCHAR(255),
    profile_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (member_id, profile_id)
);

CREATE TABLE IF NOT EXISTS fav_movie (
    member_id VARCHAR(255),
    movie_title VARCHAR(255),
    movie_summary TEXT,
    movie_image TEXT,
    PRIMARY KEY (member_id, movie_title)
);

CREATE TABLE IF NOT EXISTS customercenter (
    board_num INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(255),
    board_title VARCHAR(255),
    board_content TEXT,
    board_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    board_reply TEXT
);