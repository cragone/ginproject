package auth

import (
	"context"
	"log"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	oauth2api "google.golang.org/api/oauth2/v2"
)

var oauth2Config = &oauth2.Config{
	ClientID:     os.Getenv("CLIENT_ID"),
	ClientSecret: os.Getenv("CLIENT_SECRET"),
	RedirectURL:  "http://localhost:8080/auth/callback",
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
	Endpoint:     google.Endpoint,
}

// LoginHandler creates a Google login URL and redirects the user to it.
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	url := oauth2Config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// CallbackHandler sets up the callback handler that receives the auth code, exchanges it for a token, and retrieves user info.
func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Code not found", http.StatusBadRequest)
		return
	}

	token, err := oauth2Config.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Failed to exchange token", http.StatusInternalServerError)
		log.Printf("Exchange error: %v", err)
		return
	}

	userinfo, err := getUserInfo(token)
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		log.Printf("User info error: %v", err)
		return
	}

	// Use the userinfo (for example, display it or start a session)
	log.Printf("User info: %v", userinfo)
}

// getUserInfo uses the access token to retrieve user info from Google
func getUserInfo(token *oauth2.Token) (*oauth2api.Userinfoplus, error) {
	client := oauth2Config.Client(context.Background(), token)
	oauth2Service, err := oauth2api.New(client)
	if err != nil {
		return nil, err
	}

	userinfoService := oauth2api.NewUserinfoService(oauth2Service)
	userinfo, err := userinfoService.Get().Do()
	return userinfo, err
}
