package main

import (
	"fmt"
	"net/http"
	"server/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	//initialize the gin router
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	r.LoadHTMLGlob("dist/*.html")

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Replace with your React app's URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello, world",
		})
	})

	people := r.Group("/attendees")
	{
		people.GET("/displayed", handlers.HandleGetAllAttendees)
	}

	r.NoRoute(func(c *gin.Context) {
		fmt.Println("you are in no route")
		c.HTML(200, "index.html", nil)
	})

	fmt.Println("server has started")
	r.Run(":8080")
}
