package repository

import (
	"Project1/models"

	"github.com/go-pg/pg/v10"
)

type UserRepository struct {
	DB *pg.DB
}

func NewUserRepository(db *pg.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (r *UserRepository) IsEmailExist(email string) (bool, error) {
	var user models.User
	err := r.DB.Model(&user).
		Where("email = ?", email).
		Select()
	if err != nil {
		if err == pg.ErrNoRows {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func (r *UserRepository) CreateUser(user *models.User) error {
	_, err := r.DB.Model(user).Insert()
	return err
}

func (r *UserRepository) UpdateUser(user *models.User) error {
	_, err := r.DB.Model(user).Column("name", "email", "nim", "fakultas", "prodi").WherePK().Update()
	return err
}

func (r *UserRepository) GetUserById(id int64) (*models.User, error) {
	user := new(models.User)

	err := r.DB.Model(user).Where("id = ?", id).Select()
	return user, err
}

func (r *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	user := new(models.User)

	err := r.DB.Model(user).
		Where("email = ?", email).
		Select()
	if err != nil {
		return nil, err
	}

	return user, nil
}
