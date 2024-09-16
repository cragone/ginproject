package email

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ses"
	"github.com/aws/aws-sdk-go-v2/service/ses/types"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

var (
	Recipient = os.Getenv("RECIPIENT")
	Sender    = os.Getenv("DOMAIN")
	Subject   = "New RSVP"
)

func ConfirmationEmailForRsvp(name, email string) error {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		return fmt.Errorf("unable to load SDK config, %v", err)
	}

	svc := ses.NewFromConfig(cfg)

	input := &ses.SendEmailInput{
		Destination: &types.Destination{
			ToAddresses: []string{Recipient},
		},
		Message: &types.Message{
			Body: &types.Body{
				Text: &types.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(fmt.Sprintf("Name: %s\nEmail: %s\n", name, email)),
				},
			},
			Subject: &types.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(Subject),
			},
		},
		Source: aws.String(Sender),
	}

	_, err = svc.SendEmail(context.TODO(), input)
	if err != nil {
		return fmt.Errorf("failed to send email, %v", err)
	}

	return nil
}
