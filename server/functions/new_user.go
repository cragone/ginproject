package functions

import "server/networkconn"

type UserInformation struct {
	UserEmail     string `json:"user_email`
	UserPassword  string `json:"hashedpassword"`
	UserFname     string `json:"user_fname"`
	UserLname     string `json:"user_lname"`
	PasswordReset string `json:"passwordreset"`
	WeddingID     int    `json:"wedding_id"`
}

func AddNewUser() (users []UserInformation, err error) {
	db, err := networkconn.GetDB()
	if err != nil {
		return nil, err
	}

	defer db.Close()

}
