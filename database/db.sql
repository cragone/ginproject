-- Create the user_info table
CREATE TABLE user_info (
    user_email VARCHAR(255) UNIQUE,
    user_fname VARCHAR(255),
    user_lname VARCHAR(255),
    hashpassword VARCHAR(255),
    passwordreset VARCHAR(255) DEFAULT 'done',
    wedding_id SERIAL PRIMARY KEY
);

-- Create the attendees table
CREATE TABLE attendees (
    f_name VARCHAR(255),
    l_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(255),
    attendee SERIAL PRIMARY KEY,
    rsvp BOOLEAN DEFAULT NULL,
    wedding_id INT,
    FOREIGN KEY (wedding_id) REFERENCES user_info(wedding_id)
);

-- Create the tokens table
CREATE TABLE tokens(
    user_email VARCHAR(255) NOT NULL,
    mytoken VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (user_email) REFERENCES user_info(user_email) ON DELETE CASCADE
);
