package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(id int64, username string, role string) (string, error) {
	key := []byte(os.Getenv("SECRET"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       id,
		"username": username,
		"role":     role,
		"exp":      time.Now().Add(time.Hour * 1).Unix(),
	})

	return token.SignedString(key)
}

func ValidateToken(tokenString string) (*jwt.Token, error) {
	key := []byte(os.Getenv("SECRET"))

	return jwt.Parse(tokenString, func(t *jwt.Token) (any, error) {
		return key, nil
	})
}
