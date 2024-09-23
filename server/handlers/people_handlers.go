package handlers

import (
	"fmt"
	"server/functions"

	"github.com/gin-gonic/gin"
)

func HandleGetAllAttendees(c *gin.Context) {
	fmt.Println("Handler function 'Get All Attendees' running")

	var wedding functions.AttendeeInfo
	// Assuming the wedding ID is in the request body
	if err := c.BindJSON(&wedding); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON data: " + err.Error()})
		return
	}

	// Pass only the wedding ID to the function (not the entire struct)
	attendeeList, err := functions.GetAttendeeInformation(wedding.WeddingID)
	if err != nil {
		fmt.Println("Error in Get Attendee Information:", err)
		c.JSON(500, gin.H{"error": "Unable to fetch attendee information: " + err.Error()})
		return
	}

	fmt.Println("Attendee list:", attendeeList)
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
		fmt.Println("error binding JSON:", err)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("attendee to remove:", delAttendee)

	attendee, err := functions.RemoveAttendee(functions.AttendeeInfo{
		FirstName: delAttendee.FirstName,
		LastName:  delAttendee.LastName,
	})
	if err != nil {
		fmt.Println("error removing attendee:", err)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("attendee removed:", attendee)
	c.JSON(200, gin.H{"removed_attendee": attendee})
}
