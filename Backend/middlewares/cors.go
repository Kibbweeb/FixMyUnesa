package middlewares

import (
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func CORS() gin.HandlerFunc {
	allowedOrigins := []string{os.Getenv("CLIENT_ADDR")}

	return cors.New(cors.Config{
		AllowOrigins: allowedOrigins,
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	})
}