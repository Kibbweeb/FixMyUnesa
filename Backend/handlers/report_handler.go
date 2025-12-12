package handlers

import (
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

	"Project1/models"
	"Project1/service"
	"Project1/utils"

	"github.com/gin-gonic/gin"
)

type ReportHandler struct {
	ReportService *service.ReportService
}

func NewReportHandler(reportService *service.ReportService) *ReportHandler {
	return &ReportHandler{ReportService: reportService}
}

func (h *ReportHandler) CreateReport(c *gin.Context) {
	userIdClaim, exists := c.Get("id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user unauthorized"})
		return
	}
	userId := userIdClaim.(int64)

	err := c.Request.ParseMultipartForm(10 << 20)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse form"})
		return
	}

	title := c.PostForm("title")
	description := c.PostForm("description")
	category := c.PostForm("category")
	location := c.PostForm("location")
	priority := c.PostForm("priority")

	if title == "" || description == "" || category == "" || location == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "title, description, category, and location are required"})
		return
	}

	// Ambil file jika ada
	file, fileHeader, err := c.Request.FormFile("picture")
	pictPath := ""

	if err == nil && file != nil {
		defer file.Close()

		// Validasi ekstensi file
		ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
		allowedExts := map[string]bool{
			".jpg":  true,
			".jpeg": true,
			".png":  true,
		}

		if !allowedExts[ext] {
			c.JSON(http.StatusBadRequest, gin.H{"error": "only jpg, jpeg, and png files are allowed"})
			return
		}

		contentType := fileHeader.Header.Get("Content-Type")
		allowedTypes := map[string]bool{
			"image/jpeg": true,
			"image/jpg":  true,
			"image/png":  true,
		}

		if !allowedTypes[contentType] {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid image format. Only jpg, jpeg, and png are allowed"})
			return
		}

		// Generate unique filename
		uniqueFilename := utils.GenerateUniqueFilename(fileHeader.Filename)
		uploadPath := filepath.Join("uploads", uniqueFilename)

		// Simpan file ke folder uploads
		if err := c.SaveUploadedFile(fileHeader, uploadPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save file"})
			return
		}

		pictPath = uploadPath
	}

	req := models.CreateReportRequest{
		Title:       title,
		Description: description,
		Category:    category,
		Location:    location,
		Priority:    priority,
		Picture:     pictPath,
	}

	err = h.ReportService.CreateReport(userId, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Report created"})
}

func (h *ReportHandler) GetAllReports(c *gin.Context) {
	reports, err := h.ReportService.GetAllReports()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reports})
}

func (h *ReportHandler) GetReportsByTitle(c *gin.Context) {
	title := c.Query("title")

	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Empty title"})
		return
	}

	reports, err := h.ReportService.GetReportsByTitle(title)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reports})
}

func (h *ReportHandler) UpdateStatus(c *gin.Context) {
	stringId := c.Param("id")

	id, err := strconv.Atoi(stringId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id should be integer"})
		return
	}

	var req models.MarkAsDone
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.ReportService.ChangeReportStatus(int64(id), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status changed"})
}

func (h *ReportHandler) GetMyReports(c *gin.Context) {
	userIdClaim, exists := c.Get("id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user unauthorized"})
		return
	}
	userId := userIdClaim.(int64)

	reports, err := h.ReportService.GetReportsByUserId(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reports})
}
