package functions

import (
	"fmt"
	"server/networkconn"
)

type AttendeeInfo struct {
	FirstName   string `json:"f_name"`
	LastName    string `json:"l_name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Rsvp        bool   `json:"rsvp"`
	WeddingID   int    `json:"wedding_id"`
	AttendeeID  int    `json:"attendee"`
}

// This function now expects a weddingId (int), not the entire AttendeeInfo struct
func GetAttendeeInformation(weddingId int) (attendees []AttendeeInfo, err error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, err
	}

	defer db.Close()

	query := `
		SELECT
			f_name, l_name, email, phone_number, rsvp, attendee
		FROM
			attendees
		WHERE
			wedding_id = $1`

	// Pass the weddingId as an argument to the query
	rows, err := db.Query(query, weddingId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var a AttendeeInfo
		// Scan 6 fields, not 7 (no need to scan WeddingID again)
		err = rows.Scan(&a.FirstName, &a.LastName, &a.Email, &a.PhoneNumber, &a.Rsvp, &a.AttendeeID)
		if err != nil {
			return nil, err
		}
		// Set the wedding ID manually, since we already know it
		a.WeddingID = weddingId
		attendees = append(attendees, a)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	fmt.Println("Fetched attendee data:", attendees)

	return attendees, nil
}

// needs to insert with wedding id attached.
func AddNewAttendee(attendee AttendeeInfo) (attendees []AttendeeInfo, err error) {
	// Establish a connection to the database
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, fmt.Errorf("error connecting to db: %v", err)
	}
	defer db.Close()

	// Define the SQL insert statement
	query := `
		INSERT INTO attendees (f_name, l_name, email, phone_number, rsvp)
		VALUES ($1, $2, $3, $4, $5);
	`

	// Execute the insert statement
	_, err = db.Exec(query, attendee.FirstName, attendee.LastName, attendee.Email, attendee.PhoneNumber, attendee.Rsvp)
	if err != nil {
		return nil, fmt.Errorf("error inserting attendee: %v", err)
	}

	// Fetch all attendees to return the updated list
	rows, err := db.Query("SELECT f_name, l_name, email, phone_number, rsvp FROM attendees")
	if err != nil {
		return nil, fmt.Errorf("error querying attendees: %v", err)
	}
	defer rows.Close()

	// Populate the list of attendees
	for rows.Next() {
		var p AttendeeInfo
		err = rows.Scan(&p.FirstName, &p.LastName, &p.Email, &p.PhoneNumber, &p.Rsvp)
		if err != nil {
			return nil, fmt.Errorf("error scanning row: %v", err)
		}
		attendees = append(attendees, p)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error with rows: %v", err)
	}

	fmt.Println("new attendee added:", attendees)

	return attendees, nil
}

// need to change database to use serial id for the attendees.
// needs to confirm that it is your wedding id
func RemoveAttendee(attendee AttendeeInfo) ([]AttendeeInfo, error) {
	// Creating the db connection
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %v", err)
	}
	defer db.Close()

	// Construct the query for the db
	query := `
	DELETE FROM
		attendees
	WHERE
		f_name = $1
	AND
		l_name = $2
	`

	// Execute the query
	_, err = db.Exec(query, attendee.FirstName, attendee.LastName)
	if err != nil {
		return nil, fmt.Errorf("couldn't execute delete query: %v", err)
	}

	fmt.Println("attendee removed from list")

	return nil, nil
}
