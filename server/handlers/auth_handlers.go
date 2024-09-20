package handlers

import (
	"fmt"
	"server/functions"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

	//Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.UserPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(400, gin.H{"error": "error hashing the password"})
		return
	}

	//update user info struct with hashed password
	newUser.UserPassword = string(hashedPassword)

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

// handler function for logging in:
// we need to receive the user email and password
// verify it against the encrypted password at the set email
// return the user information + a session token.
func HandleUserLogin(c *gin.Context) {
	fmt.Println("logging in")

	// Setting a variable to bind the data to a struct and check email/password.
	var currentUser functions.UserInformation
	if err := c.BindJSON(&currentUser); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Retrieve user information from the database
	user, err := functions.GetUserByEmail(currentUser.UserEmail)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid email or password"})
		return
	}

	// Compare the provided password with the stored hashed password
	err = bcrypt.CompareHashAndPassword([]byte(user.UserPassword), []byte(currentUser.UserPassword))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid email or password"})
		return
	}

	// Return the user information if login is successful
	c.JSON(200, gin.H{
		"user_email": user.UserEmail,
		"user_fname": user.UserFname,
		"user_lname": user.UserLname,
		"wedding_id": user.WeddingID,
	})

	fmt.Println("success")
}
