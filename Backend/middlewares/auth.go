package middlewares

import (
    "Project1/utils"
    "net/http"

    "github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "success": false,
                "error":   "Authorization header required",
            })
            c.Abort()
            return
        }

        tokenString := utils.ExtractTokenFromHeader(authHeader)
        if tokenString == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "success": false,
                "error":   "Invalid authorization format",
            })
            c.Abort()
            return
        }

        claims, err := utils.ValidateToken(tokenString)
        if err != nil {
            var errorMsg string
            switch err {
            case utils.ErrExpiredToken:
                errorMsg = "Token has expired"
            case utils.ErrInvalidToken:
                errorMsg = "Invalid token"
            default:
                errorMsg = "Authentication failed"
            }

            c.JSON(http.StatusUnauthorized, gin.H{
                "success": false,
                "error":   errorMsg,
            })
            c.Abort()
            return
        }

        c.Set("Id", claims.Id)
        c.Set("Username", claims.Username)
        c.Set("userRole", claims.Role)

        c.Next()
    }
}