package handlers

import (
	"fmt"
	"server/functions"

	"github.com/gin-gonic/gin"
)

// follow this function to new_user.go for the query
// this is the new user flow that creates users
func HandleCreateUser(c *gin.Context) {
	fmt.Println("new user handler called")

	var newUser functions.UserInformation
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	//binds the json data to the user info struct in new_user.go
	user, err := functions.AddNewUser(functions.UserInformation{
		UserEmail:    newUser.UserEmail,
		UserFname:    newUser.UserFname,
		UserLname:    newUser.UserLname,
		UserPassword: newUser.UserPassword,
	})
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"added_user": user})
}
