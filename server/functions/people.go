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
}

func GetAttendeeInformation() (attendees []AttendeeInfo, err error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, err
	}

	defer db.Close()

	query := `
		SELECT
			f_name, l_name, email, phone_number, rsvp
		FROM
			attendees`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var a AttendeeInfo
		err = rows.Scan(&a.FirstName, &a.LastName, &a.Email, &a.PhoneNumber, &a.Rsvp)
		if err != nil {
			return nil, err
		}
		attendees = append(attendees, a)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	fmt.Println("fetched attendee data:", attendees)

	return attendees, nil

}
