package handlers

import (
	"fmt"
	"os"
	"server/functions"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

// setting variable for sercret key
var JwtKey []byte

// token storage map
var TokenStore = make(map[string]string)

// load up jwt secret key
func init() {
	//loads in our environment variables.
	err := godotenv.Load()
	if err != nil {
		fmt.Println("error loading env")
		return
	}

	sercretKey := os.Getenv("JWT_SECRET_KEY")
	if sercretKey == "" {
		fmt.Println("no jwt key acquired")
		return
	}

	JwtKey = []byte(sercretKey)
	fmt.Println("secret loaded")
}

// create the map for the jwts storage.
func CreateJWT(email string) (string, error) {
	//set the token expiration time.
	expirationTime := time.Now().Add(1 * time.Hour)

	//create the claims for the jwt
	claims := &jwt.MapClaims{
		"email": email,
		"exp":   expirationTime.Unix(),
	}

	// create the token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// sign the token using the secret key
	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		return "", err
	}

	//token store in mao
	TokenStore[email] = tokenString

	return tokenString, nil
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

	//generate the jwt token for logged in user
	token, err := CreateJWT(user.UserEmail)
	if err != nil {
		c.JSON(400, gin.H{"error": "failed to generate jwt"})
		return
	}

	// Return the user information if login is successful
	c.JSON(200, gin.H{
		"user_email": user.UserEmail,
		"user_fname": user.UserFname,
		"user_lname": user.UserLname,
		"wedding_id": user.WeddingID,
		"token":      token,
	})

	fmt.Println("success")
}

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
