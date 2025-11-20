package main

import (
	"os"

	"Project1/config"
	"Project1/handlers"
	"Project1/middlewares"
	"Project1/repository"
	svc "Project1/service"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
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

	public := router.Group("/api")
	user := public.Group("/user")
	admin := public.Group("/admin")

	user.Use(middlewares.AuthMiddleware())
	admin.Use(middlewares.AdminMiddleware())

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	public.POST("/signup", authHandler.SignUpHandler)
	public.POST("/signin", authHandler.SignInHandler)

	user.POST("/profile", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"username": ctx.MustGet("username"),
			"role":     ctx.MustGet("role"),
		})
	})
	router.Run(":" + os.Getenv("APP_PORT"))
}
