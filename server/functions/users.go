package functions

import (
	"database/sql"
	"fmt"
	"server/networkconn"
)

type UserInformation struct {
	UserEmail     string `json:"user_email"`
	UserPassword  string `json:"hashpassword"`
	UserFname     string `json:"user_fname"`
	UserLname     string `json:"user_lname"`
	PasswordReset string `json:"password_reset"`
	WeddingID     int    `json:"wedding_id"`
}

func GetUserByEmail(email string) (UserInformation, error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return UserInformation{}, err
	}
	defer db.Close()

	var user UserInformation
	query := `
    SELECT
        user_email, hashpassword, user_fname, user_lname, wedding_id
    FROM
        user_info
    WHERE
        user_email = $1`

	err = db.QueryRow(query, email).Scan(&user.UserEmail, &user.UserPassword, &user.UserFname, &user.UserLname, &user.WeddingID)
	if err != nil {
		if err == sql.ErrNoRows {
			return UserInformation{}, fmt.Errorf("user not found")
		}
		return UserInformation{}, fmt.Errorf("couldn't select user info: %v", err)
	}

	fmt.Println("user found")
	return user, nil
}

func AddNewUser(user UserInformation) (UserInformation, error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return UserInformation{}, err
	}

	defer db.Close()

	query := `
	INSERT INTO 
		user_info (user_email, user_fname, user_lname, hashpassword)
	VALUES 
		($1, $2, $3, $4)`

	_, err = db.Exec(query, user.UserEmail, user.UserFname, user.UserLname, user.UserPassword)
	if err != nil {
		return UserInformation{}, fmt.Errorf("couldn't insert new user: %v", err)
	}

	fmt.Println("new user created")

	return user, nil
}
