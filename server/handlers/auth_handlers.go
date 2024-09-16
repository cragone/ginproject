package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	clientID     string
	clientSecret string
	redirectURI  string
	oauth2Config *oauth2.Config
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	clientID = os.Getenv("CLIENT_ID")
	clientSecret = os.Getenv("CLIENT_SECRET")
	redirectURI = os.Getenv("REDIRECT_URI")

	if clientID == "" || clientSecret == "" || redirectURI == "" {
		log.Fatalf("Environment variables CLIENT_ID, CLIENT_SECRET, or REDIRECT_URI are not set")
	}

	oauth2Config = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURI,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}

type CodeRequest struct {
	Code string `json:"code"`
}

func HandleExchangeCode(c *gin.Context) {
	var codeRequest CodeRequest
	if err := c.ShouldBindJSON(&codeRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := oauth2Config.Exchange(c, codeRequest.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange code"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"access_token": token.AccessToken})
}
