package service

import (
	"Project1/models"
	"Project1/repository"
)

type ReportService struct {
	Repo *repository.ReportRepository
}

func NewReportService(repo *repository.ReportRepository) *ReportService {
	return &ReportService{Repo: repo}
}

func (s *ReportService) CreateReport(userId int64, req models.CreateReportRequest) error {
	report := models.Report{
		UserId:      userId,
		Title:       req.Title,
		Description: req.Description,
		Category:    req.Category,
		Location:    req.Location,
		Priority:    req.Priority,
	}

	return s.Repo.CreateReport(&report)
}

func (s *ReportService) GetAllReports() ([]models.Report, error) {
	return s.Repo.GetAllReports()
}

func (s *ReportService) GetReportsByTitle(title string) ([]models.Report, error) {
	return s.Repo.GetReportsByTitle(title)
}

func (s *ReportService) ChangeReportStatus(reportId int64, req models.MarkAsDone) error {
	return s.Repo.ChangeReportStatus(reportId, req.Status)
}
