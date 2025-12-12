package utils

import (
	"crypto/rand"
	"fmt"
	"path/filepath"
	"time"
)

func GenerateUniqueFilename(originalFilename string) string {
	ext := filepath.Ext(originalFilename)

	randomBytes := make([]byte, 8)
	_, err := rand.Read(randomBytes)
	if err != nil {
		randomBytes = []byte(fmt.Sprintf("%d", time.Now().UnixNano()))
	}

	uniqueName := fmt.Sprintf("%d_%x%s", time.Now().UnixNano(), randomBytes, ext)

	return uniqueName
}
