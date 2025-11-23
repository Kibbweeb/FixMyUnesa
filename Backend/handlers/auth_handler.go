package handlers

import (
	"Project1/models"
	"Project1/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	UserService *service.UserService
}

func NewAuthHandler(userService *service.UserService) *AuthHandler {
	return &AuthHandler{UserService: userService}
}

func (h *AuthHandler) SignUpHandler(c *gin.Context) {
	var req models.SignUpRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	exists, err := h.UserService.IsEmailExist(req.Email)
	if err != nil {
		c.JSON(500, gin.H{"error": "Server error"})
		return
	}

	if exists {
		c.JSON(400, gin.H{"error": "Email sudah digunakan"})
		return
	}

	err = h.UserService.CreateUser(req)
	if err != nil {
		c.JSON(500, gin.H{"error": "Gagal membuat user"})
		return
	}

	c.JSON(200, gin.H{"message": "SignUp berhasil"})
}

func (h *AuthHandler) SignInHandler(c *gin.Context) {
	var req models.SignInRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	authResponse, err := h.UserService.SignIn(req)
	if err != nil {
		c.JSON(401, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(200, gin.H{
		"success": true,
		"message": "SignIn berhasil",
		"data": authResponse,
	})
}
