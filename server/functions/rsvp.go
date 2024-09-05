package functions

import (
	"fmt"
	"server/networkconn"
)

type Rsvp struct {
	FirstName string `json:"f_name"`
	LastName  string `json:"l_name"`
	Rsvp      bool   `json:"rsvp"`
}

func RsvpAdded() (rsvps []Rsvp, err error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, err
	}

	defer db.Close()

	query := `
		UPDATE
			wedding_info
		SET 
			rsvp = %s
		WHERE
			f_name = %s 
		AND
			l_name = %s
	`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var r Rsvp
		err = rows.Scan(&r.FirstName, &r.LastName, &r.Rsvp)
		if err != nil {
			return nil, err
		}
		rsvps = append(rsvps, r)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	fmt.Println("Updated attendees rsvp:", rsvps)

	return rsvps, nil
}
