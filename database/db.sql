create table wedding (
	wedding_id SERIAL PRIMARY KEY
);


--need to add an attendee serial id, for cases of the same name.
create table attendees (
	f_name VARCHAR(255),
	l_name VARCHAR(255),
	email VARCHAR(255),
	phone_number VARCHAR(255),
	rsvp boolean,
	wedding_id INT,
	FOREIGN KEY (wedding_id) REFERENCES wedding(wedding_id)
);

create table user_info (
	user_email VARCHAR(255),
	user_fname VARCHAR(255),
	user_lname VARCHAR(255),
	hashpassword VARCHAR(255),
	passwordreset VARCHAR(255) DEFAULT 'done',
	wedding_id INT,
	FOREIGN KEY (wedding_id) REFERENCES wedding(wedding_id)
);


CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expiry TIMESTAMP
);
-- need to make it so the rsvp starts as null and is decided.



-- CREATE TABLE tokens(
--     email VARCHAR(255) NOT NULL,
--     mytoken VARCHAR(255) PRIMARY KEY,
--     FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
-- );