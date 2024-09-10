INSERT INTO attendees (f_name, l_name, email, phone_number, rsvp, wedding_id)
VALUES 
('John', 'Doe', 'john.doe@email.com', '123-456-7890', TRUE, 1),
('Jane', 'Doe', 'jane.doe@email.com', '123-456-7891', TRUE, 1),
('Michael', 'Smith', 'michael.smith@email.com', '123-456-7892', FALSE, 2),
('Emily', 'Jones', 'emily.jones@email.com', '123-456-7893', TRUE, 2),
('David', 'Brown', 'david.brown@email.com', '123-456-7894', FALSE, 3),
('Sarah', 'Johnson', 'sarah.johnson@email.com', '123-456-7895', TRUE, 3);


select * from wedding

INSERT INTO wedding (wedding_id)
VALUES (DEFAULT), (DEFAULT), (DEFAULT);

INSERT INTO user_info (user_email, user_password, wedding_id)
VALUES
('wedding1.owner@email.com', 'password123', 1),
('wedding2.owner@email.com', 'password456', 2),
('wedding3.owner@email.com', 'password789', 3);