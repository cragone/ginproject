package main

import (
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var oauth2Config = &oauth2.Config{
	ClientID:     os.Getenv("CLIENT_ID"),
	ClientSecret: os.Getenv("CLIENT_SECRET"),
	RedirectURL:  "http://localhost:8080/auth/callback",
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
	Endpoint:     google.Endpoint,
}

// func googleAuthHandler(w http.ResponseWriter, r *http.Request) {
// 	code := r.FormValue("code")

// 	// Verify auth code
// 	token, err := oauth2Config.Exchange(context.Background(), code)
// 	if err != nil {
// 		http.Error(w, "Error verifying auth code", http.StatusInternalServerError)
// 		return
// 	}

// 	// Exchange auth code for access token
// 	accessToken := token.AccessToken

// 	// Store access token in session or database
// 	session, err := store.Get(r, "session")
// 	if err != nil {
// 		http.Error(w, "Error storing access token", http.StatusInternalServerError)
// 		return
// 	}
// 	session.Values["accessToken"] = accessToken
// 	err = session.Save(r, w)
// 	if err != nil {
// 		http.Error(w, "Error saving session", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Write([]byte("Authenticated successfully"))
// }
//needs to store session in database.
