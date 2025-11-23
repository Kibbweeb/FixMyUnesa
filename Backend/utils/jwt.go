package utils

import (
	"os"
	"time"
	"errors"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret []byte
var (
	ErrInvalidToken = errors.New("invalid token")
	ErrExpiredToken = errors.New("token expired")
)

func init() {
	secret := os.Getenv("SECRET")
	if secret == "" {
		panic("SECRET environtment variable not set")
	}
	jwtSecret = []byte(secret)
}

type JWTClaims struct {
	Id int64 `json:"id"`
	Username string `json:"name"`
	Role string `json:"role"`
	jwt.RegisteredClaims
}

func GenerateJWT(id int64, name string, role string) (string, error) {
	claims := JWTClaims{
		Id: id,
		Username: name,
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 1)),
			IssuedAt: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func ValidateToken(tokenString string) (*JWTClaims, error) {
    token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(t *jwt.Token) (interface{}, error) {
        if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, errors.New("unexpected signing method")
        }
        return jwtSecret, nil
    })

    if err != nil {
        if errors.Is(err, jwt.ErrTokenExpired) {
            return nil, ErrExpiredToken
        }
        return nil, ErrInvalidToken
    }

    if !token.Valid {
        return nil, ErrInvalidToken
    }

    claims, ok := token.Claims.(*JWTClaims)
    if !ok {
        return nil, ErrInvalidToken
    }

    return claims, nil
}

func ExtractTokenFromHeader(authHeader string) string {
    parts := strings.Split(authHeader, " ")
    if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
        return ""
    }
    return parts[1]
}
