package functions

import (
	"fmt"
	"server/networkconn"
)

type Rsvp struct {
	FirstName  string `json:"f_name"`
	LastName   string `json:"l_name"`
	Rsvp       bool   `json:"rsvp"`
	WeddingID  int    `json:"wedding_id"`
	Email      string `json:"email"`
	AttendeeID int    `json:"attendee"`
}

func RsvpAdded(email string, rsvp bool) (rsvps []Rsvp, err error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		UPDATE
			attendees
		SET 
			rsvp = $1
		WHERE
			email = $2 
	`
	_, err = db.Exec(query, rsvp, email)
	if err != nil {
		return nil, err
	}

	query = `
		SELECT
			email, rsvp
		FROM
			attendees
		WHERE
			email = $1
	`
	rows, err := db.Query(query, email)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var r Rsvp
		err = rows.Scan(&r.Email, &r.Rsvp)
		if err != nil {
			return nil, err
		}
		rsvps = append(rsvps, r)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("row iteration error: %w", err)
	}

	fmt.Println("Updated attendees rsvp:", rsvps)

	return rsvps, nil
}
