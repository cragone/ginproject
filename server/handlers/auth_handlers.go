package handlers

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	redirectURI := os.Getenv("REDIRECT_URI")

	if clientID == "" || clientSecret == "" || redirectURI == "" {
		log.Fatalf("Environment variables CLIENT_ID, CLIENT_SECRET, or REDIRECT_URI are not set")
	}

	oauth2Config = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURI,
		Endpoint:     google.Endpoint,
	}
}

var oauth2Config *oauth2.Config

type CodeRequest struct {
	Code string `json:"code"`
}

func HandleExchangeCode(c *gin.Context) {
	var codeRequest CodeRequest
	if err := c.ShouldBindJSON(&codeRequest); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request payload", "details": err.Error()})
		return
	}

	// Log the authorization code to verify it is being received correctly
	log.Printf("Authorization Code: %s", codeRequest.Code)

	token, err := oauth2Config.Exchange(context.Background(), codeRequest.Code)
	if err != nil {
		log.Printf("Error exchanging code for token: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to exchange code for token", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": token.AccessToken,
		"id_token":     token.Extra("id_token"),
	})
}
