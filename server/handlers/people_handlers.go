package handlers

import (
	"fmt"
	"server/functions"

	"github.com/gin-gonic/gin"
)

type NewAttendee struct {
	FirstName   string `json:"f_name"`
	LastName    string `json:"l_name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Rsvp        bool   `json:"rsvp"`
}

func HandleGetAllAttendees(c *gin.Context) {
	fmt.Print("handler function running is get all attendees")

	attendeeList, err := functions.GetAttendeeInformation()
	if err != nil {
		fmt.Println("error in Get Attendee Information:", err)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("attendee list:", attendeeList)
	c.JSON(200, gin.H{"attendees": attendeeList})
}

func HandleAddAttendee(c *gin.Context) {
	fmt.Println("Running handler to add new attendee")

	var newAttendee NewAttendee
	if err := c.BindJSON(&newAttendee); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Call AddNewAttendee with a single AttendeeInfo struct
	attendee, err := functions.AddNewAttendee(functions.AttendeeInfo{
		FirstName:   newAttendee.FirstName,
		LastName:    newAttendee.LastName,
		Email:       newAttendee.Email,
		PhoneNumber: newAttendee.PhoneNumber,
		Rsvp:        newAttendee.Rsvp,
	})
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"added_attendee": attendee})
}
