package config

import (
	"context"
	"log"
	"os"

	"github.com/go-pg/pg/v10"
)

func ConnectDB() *pg.DB {
	db := pg.Connect(&pg.Options{
		Addr:     os.Getenv("DB_ADDR"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Database: os.Getenv("DB_NAME"),
	})

	//test connection
	if err := db.Ping(context.Background()); err != nil {
		log.Fatalf("Failed to Connect: %v", err)
	}
	log.Printf("Database Connected")

	return db
}