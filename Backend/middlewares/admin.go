package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AdminMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		role := ctx.MustGet("role").(string)

		if role != "admin" {
			ctx.JSON(http.StatusForbidden, gin.H{
				"error": "Admin only",
			})
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}
