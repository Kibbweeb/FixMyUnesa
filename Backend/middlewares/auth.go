package middlewares

import (
	"net/http"

	"Project1/utils"

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

		c.Set("id", claims.Id)
		c.Set("username", claims.Username)
		c.Set("role", claims.Role)

		c.Next()
	}
}

