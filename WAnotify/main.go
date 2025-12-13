package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/joho/godotenv"
)

type Report struct {
	Id          int64
	Title       string
	Description string
	Location    string
	CreatedAt   time.Time
}

func main() {
	_ = godotenv.Load()

	opt, err := pg.ParseURL(os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Connection Error:", err)
	}
	db := pg.Connect(opt)
	defer db.Close()

	log.Println("Application started...")

	for {
		checkAndNotify(db)
		time.Sleep(10 * time.Second)
	}
}

func checkAndNotify(db *pg.DB) {
	var reports []Report

	err := db.Model(&reports).Where("is_notified = ?", false).Limit(5).Select()
	if err != nil {
		log.Println("Error fetching reports:", err)
		return
	}

	for _, report := range reports {
		log.Printf("Processing Report ID: %d", report.Id)

		success := sendFonnte(report)

		if success {
			_, err := db.Model(&Report{}).Set("is_notified = ?", true).Where("id = ?", report.Id).Update()

			if err != nil {
				log.Println("Failed to update status:", err)
			} else {
				log.Println("Notification sent. ID:", report.Id)
			}
		}
	}
}

func sendFonnte(report Report) bool {
	token := os.Getenv("WA_TOKEN")
	target := os.Getenv("ADMIN_PHONE")

	message := fmt.Sprintf(
		"===== Laporan Masuk =====\n\n"+"Judul: %s\n"+"Lokasi: %s\n"+"Waktu: %s\n\n", report.Title, report.Location, report.CreatedAt.Format("02-01-2006 15:04"),
	)

	payload := map[string]string{
		"target":  target,
		"message": message,
	}

	jsonValue, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "https://api.fonnte.com/send", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Fonnte API error:", err)
		return false
	}

	defer resp.Body.Close()

	return resp.StatusCode == 200
}
