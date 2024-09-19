package main

import (
	"fmt"
	"os"
	"server/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Initialize the gin router
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	redirectURI := os.Getenv("REDIRECT_URI")

	// Load HTML templates
	r.LoadHTMLGlob("dist/*.html")

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Replace with your React app's URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// MaxAge:           24 * time.Hour, // Remove this line to turn off the time limit
	}))

	// RSVP routes
	rsvp := r.Group("/rsvp")
	{
		rsvp.POST("/decided", handlers.HandlePostRsvpDecision)
	}

	// Attendees routes
	people := r.Group("/attendees")
	{
		people.GET("/displayed", handlers.HandleGetAllAttendees)
		people.POST("/newattendee", handlers.HandleAddAttendee)
		people.DELETE("/deleteattendee", handlers.HandleAttendeeRemoval)
	}

	// No route handler
	r.NoRoute(func(c *gin.Context) {
		fmt.Println("you are in no route")
		c.HTML(200, "index.html", nil)
	})

	fmt.Println("server has started")
	r.Run(":8080")
}
