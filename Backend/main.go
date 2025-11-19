package main

import (
	"Project1/config"
	"Project1/handlers"
	"Project1/repository"
	svc "Project1/service"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main(){
	config.LoadEnv()

	db := config.ConnectDB()
	defer db.Close()

	router := gin.Default()
	store := cookie.NewStore([]byte("secret123"))
	router.Use(sessions.Sessions("mysession", store))
	
	router.SetTrustedProxies([]string{"127.0.0.1"})

	router.Use(config.CorsConfig())

	repo := repository.NewUserRepository(db)
	userService := svc.NewUserService(repo)
	authHandler := handlers.NewAuthHandler(userService)

	router.GET("/ping", func(c *gin.Context){
		c.JSON(200, gin.H{
			"message" : "pong",
		})
	})

	router.POST("/signup", authHandler.SignUpHandler)

	router.POST("/signin", authHandler.SignInHandler)

	router.Run(":" + os.Getenv("APP_PORT"))
}