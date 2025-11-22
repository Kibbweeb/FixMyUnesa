package middlewares

import (
	"net/http"
	"strings"

	"Project1/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "no authorization header"})
			ctx.Abort()
			return
		}

		splits := strings.Split(authHeader, " ")
		if splits[0] != "Bearer" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "token invalid"})
			ctx.Abort()
			return
		}

		if len(splits) < 2 {
            ctx.JSON(http.StatusUnauthorized, gin.H{"error": "token missing"})
            ctx.Abort()
            return
        }

		tokenString := splits[1]

		token, err := utils.ValidateToken(tokenString)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "token invalid"})
			ctx.Abort()
			return
		}

		claims := token.Claims.(jwt.MapClaims)

		id := int64(claims["id"].(float64))
		username := claims["username"].(string)
		role := claims["role"].(string)

		ctx.Set("id", id)
		ctx.Set("username", username)
		ctx.Set("role", role)

		ctx.Next()
	}
}
