package handlers

import (
    "Project1/models"
    "Project1/service"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/sessions"

)

type AuthHandler struct {
    UserService *services.UserService
}

func NewAuthHandler(userService *services.UserService) *AuthHandler {
    return &AuthHandler{UserService: userService}
}

func (h *AuthHandler) SignUpHandler(c *gin.Context) {
    var req models.SignUpRequest

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request"})
        return
    }

    if req.Name == "" || req.Email == "" || req.Password == "" {
        c.JSON(400, gin.H{"error": "Name, Email, Password wajib diisi"})
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

    if req.Email == "" || req.Password == "" {
        c.JSON(400, gin.H{"error": "Email dan Password wajib diisi"})
        return
    }

    user, err := h.UserService.SignIn(req)
    if err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    session := sessions.Default(c)
    session.Set("user_id", user.Id)
    session.Set("user_email", user.Email)
    session.Save()

    c.JSON(200, gin.H{"message": "SignIn berhasil"})
}

