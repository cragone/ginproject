package networkconn

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// func init() {

// }

func GetDB() (*sql.DB, error) {
	var db *sql.DB

	//loads in our environment variables.
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	//setting our environment variables to variables in this file
	dbname := os.Getenv("DB_NAME")
	dbuser := os.Getenv("DB_USER")
	dbpassword := os.Getenv("PGPASSWORD")
	dbhost := os.Getenv("DB_HOST")
	sslmode := os.Getenv("DB_SSL_MODE")

	//creating the connection string
	connString := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=%s", dbuser, dbpassword, dbname, dbhost, "5432", sslmode)

	//opening our db and connecting.
	db, err = sql.Open("postgres", connString)
	if err != nil {
		return nil, err
	}

	//this checks db connection.
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
