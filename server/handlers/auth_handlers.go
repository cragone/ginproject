package handlers

import (
	"log"
	"net/http"
	"os"
	"server/functions"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("error getting .env file for google auth: %v", err)
	}
}

type token struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	Expiry       time.Time `json:"expiry"`
}

var oauth2Config = &oauth2.Config{
	ClientID:     os.Getenv("CLIENT_ID"),
	ClientSecret: os.Getenv("CLIENT_SECRET"),
	RedirectURL:  "http://localhost:8080/auth/callback",
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
	Endpoint:     google.Endpoint,
}

func handleGoogleLogin(c *gin.Context) {
	url := oauth2Config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func handleGoogleCallback(c *gin.Context) {
	code := c.Query("code")
	ctx := c.Request.Context()
	token, err := oauth2Config.Exchange(ctx, code)
	if err != nil {
		log.Printf("error exchanging the code: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "token exchange failed"})
		return
	}

	Tokens, err := functions.SaveTokenToDB(token.AccessToken, token.RefreshToken, &token.Expiry)
	if err != nil {
		log.Printf("error saving token to database: %v", err)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"updated token": Tokens})
}
