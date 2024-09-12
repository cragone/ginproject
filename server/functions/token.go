package functions

import (
	"server/networkconn"
	"time"
)

type Tokens struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	Expiry       time.Time `json:"expiry"`
}

func SaveTokenToDB(accessToken, refreshToken string, expiry *time.Time) (Tokens, error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return Tokens{}, err
	}
	defer db.Close()

	query := `
        INSERT INTO tokens
        (access_token, refresh_token, expiry)
        VALUES
        ($1, $2, $3)`
	_, err = db.Exec(query, accessToken, refreshToken, expiry)
	if err != nil {
		return Tokens{}, err
	}

	return Tokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		Expiry:       *expiry, //dereference the pointer.
	}, nil
}
