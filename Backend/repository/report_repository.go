package repository

import (
	"errors"
	"time"

	"Project1/models"

	"github.com/go-pg/pg/v10"
)

type ReportRepository struct {
	DB *pg.DB
}

func NewReportRepository(db *pg.DB) *ReportRepository {
	return &ReportRepository{DB: db}
}

func (r *ReportRepository) CreateReport(report *models.Report) error {
	_, err := r.DB.Model(report).Insert()
	return err
}

func (r *ReportRepository) GetAllReports() ([]models.Report, error) {
	var reports []models.Report

	err := r.DB.Model(&reports).Relation("User").Select()
	if err != nil {
		return nil, err
	}
	return reports, nil
}

func (r *ReportRepository) GetReportsByTitle(title string) ([]models.Report, error) {
	var reports []models.Report

	err := r.DB.Model(&reports).
		Relation("User").
		Where("title ILIKE ?", "%"+title+"%").
		Select()

	return reports, err
}

func (r *ReportRepository) ChangeReportStatus(reportId int64, reportStatus string) error {
	report := &models.Report{
		Id:        reportId,
		Status:    reportStatus,
		UpdatedAt: time.Now(),
	}

	result, err := r.DB.Model(report).
		Column("status", "updated_at").
		WherePK().
		Update()
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return errors.New("Report not found")
	}

	return nil
}

func (r *ReportRepository) GetReportsByUserId(userId int64) ([]models.Report, error) {
	var reports []models.Report

	err := r.DB.Model(&reports).
		Relation("User").
		Where("report.user_id = ?", userId).
		Select()

	return reports, err
}
