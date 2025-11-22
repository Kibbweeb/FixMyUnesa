package service

import (
	"Project1/models"
	"Project1/repository"
    "errors"

	"golang.org/x/crypto/bcrypt"
    "github.com/go-pg/pg/v10"
)

type UserService struct {
    Repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
    return &UserService{Repo: repo}
}

// Cek apakah email sudah terdaftar
func (s *UserService) IsEmailExist(email string) (bool, error) {
    return s.Repo.IsEmailExist(email)
}

// Proses sign up user baru
func (s *UserService) CreateUser(req models.SignUpRequest) error {

    hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
    if err != nil {
        return err
    }

    user := models.User{
        Name:     req.Name,
        Email:    req.Email,
        Password: string(hashed),
    }

    return s.Repo.CreateUser(&user)
}

//Sign in
func (s *UserService) SignIn(req models.SignInRequest) (*models.User, error) {
    user, err := s.Repo.GetUserByEmail(req.Email)
    
    if err != nil {
    if err == pg.ErrNoRows {
        return nil, errors.New("email tidak ditemukan")
    }
    return nil, errors.New("database error")
}


    if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
        return nil, errors.New("password salah")
    }

    return user, nil
}
