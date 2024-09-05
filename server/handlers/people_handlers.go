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
