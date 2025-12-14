package main

import (
	"os"

	"Project1/config"
	"Project1/handlers"
	"Project1/middlewares"
	"Project1/repository"

	svc "Project1/service"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	db := config.ConnectDB()
	defer db.Close()

	router := gin.Default()

	router.SetTrustedProxies([]string{"127.0.0.1"})

	router.Use(middlewares.CORS())

	router.Static("/uploads", "./uploads")

	userRepo := repository.NewUserRepository(db)
	reportRepo := repository.NewReportRepository(db)
	userService := svc.NewUserService(userRepo)
	reportService := svc.NewReportService(reportRepo)
	authHandler := handlers.NewAuthHandler(userService)
	reportHandler := handlers.NewReportHandler(reportService)
	public := router.Group("/api")
	user := public.Group("/user")
	admin := public.Group("/admin")

	user.Use(middlewares.AuthMiddleware())
	admin.Use(middlewares.AuthMiddleware())
	admin.Use(middlewares.AdminMiddleware())

	public.POST("/signup", authHandler.SignUpHandler)
	public.POST("/signin", authHandler.SignInHandler)
	public.POST("/logout", authHandler.LogoutHandler)

	user.PUT("/profile", authHandler.UpdateProfileHandler)
	user.POST("/report", reportHandler.CreateReport)
	user.GET("/my-reports", reportHandler.GetMyReports)
	user.DELETE("/report/:id", reportHandler.DeleteReport)

	admin.GET("/report/search", reportHandler.GetReportsByTitle)
	admin.GET("/reports", reportHandler.GetAllReports)
	admin.PATCH("/report/:id", reportHandler.UpdateStatus)
	admin.DELETE("/report/:id", reportHandler.AdminDeleteReport)

	router.Run(":" + os.Getenv("APP_PORT"))
}
