package main

import (
	"fmt"
	"server/handlers"
	"server/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

//help me

func main() {
	// Initialize the gin router
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	// Load HTML templates
	r.LoadHTMLGlob("dist/*.html")

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Replace with your React app's URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// MaxAge:           24 * time.Hour, // Remove this line to turn off the time limit
	}))

	//serve entire dist directory as static file
	r.Static("/dist", "./dist")

	//serve the couple.png file
	r.StaticFile("/couple.png", "./dist/couple.png")

	//serve the assets directory
	r.Static("/assets", "./dist/assets")

	//load the html files
	r.LoadHTMLFiles("dist/index.html")

	// auth routes
	user := r.Group("/auth")
	{
		user.POST("/usercreated", handlers.HandleCreateUser)
		user.POST("/loggedin", handlers.HandleUserLogin)
	}

	// RSVP routes
	rsvp := r.Group("/rsvp")
	rsvp.Use(middleware.TokenAuthMiddleware())
	{
		rsvp.POST("/decided", handlers.HandlePostRsvpDecision)
	}

	// Attendees routes
	people := r.Group("/attendees")
	// people.Use(middleware.TokenAuthMiddleware())
	{
		people.POST("/updatenumber", handlers.HandleUpdatePhoneNumber)
		people.POST("/displayed", handlers.HandleGetAllAttendees)
		people.POST("/newattendee", handlers.HandleAddAttendee)
		people.DELETE("/deleteattendee", handlers.HandleAttendeeRemoval)
	}

	// No route handler
	r.NoRoute(func(c *gin.Context) {
		c.File("dist/index.html") // corrected routing
	})

	fmt.Println("server has started on port 80")
	r.Run(":80")
}
