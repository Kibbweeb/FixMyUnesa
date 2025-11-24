package handlers

import (
	"net/http"
	"strconv"

	"Project1/models"
	"Project1/service"

	"github.com/gin-gonic/gin"
)

type ReportHandler struct {
	ReportService *service.ReportService
}

func NewReportHandler(reportService *service.ReportService) *ReportHandler {
	return &ReportHandler{ReportService: reportService}
}

func (h *ReportHandler) CreateReport(c *gin.Context) {
	userIdClaim, exists := c.Get("Id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user unauthorized"})
		return
	}
	userId := userIdClaim.(int64)

	var req models.CreateReportRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.ReportService.CreateReport(userId, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed creating report"})
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
