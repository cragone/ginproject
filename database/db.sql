create table wedding (
	wedding_id SERIAL PRIMARY KEY
);

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
	user_password VARCHAR(255),
	wedding_id INT,
	FOREIGN KEY (wedding_id) REFERENCES wedding(wedding_id)
);

-- need to make it so the rsvp starts as null and is decided.