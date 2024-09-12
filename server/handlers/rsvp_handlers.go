package handlers

import (
	"fmt"
	"server/functions"

	"github.com/gin-gonic/gin"
)

type RsvpRequest struct {
	FirstName string `json:"f_name"`
	LastName  string `json:"l_name"`
	Rsvp      bool   `json:"rsvp"`
}

func HandlePostRsvpDecision(c *gin.Context) {
	fmt.Println("RSVP handler function is currently running")

	//parsing the incoming json
	var rsvpRequest RsvpRequest
	if err := c.ShouldBindJSON(&rsvpRequest); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	//call the rsvp added function to update the rsvp status
	rsvps, err := functions.RsvpAdded(rsvpRequest.FirstName, rsvpRequest.LastName, rsvpRequest.Rsvp)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	//return the updated details of the request
	c.JSON(200, gin.H{"updated rsvps": rsvps})
}
