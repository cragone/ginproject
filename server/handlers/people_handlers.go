package handlers

import (
	"fmt"
	"server/functions"

	"github.com/gin-gonic/gin"
)

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

	var newAttendee functions.AttendeeInfo
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

func HandleAttendeeRemoval(c *gin.Context) {
	fmt.Println("removal handler now running")

	var delAttendee functions.AttendeeInfo
	if err := c.BindJSON(&delAttendee); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	attendee, err := functions.RemoveAttendee(delAttendee)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"removed_attendee": attendee})
}
