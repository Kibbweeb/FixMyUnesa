package service

import (
	"Project1/models"
	"Project1/repository"
	"Project1/utils"
	"errors"
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
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return errors.New("failed to hash password")
	}

	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
		NIM:      req.NIM,
		Fakultas: req.Fakultas,
		Prodi:    req.Prodi,
	}

	return s.Repo.CreateUser(&user)
}

func (s *UserService) UpdateProfile(userId int64, req models.UpdateUserRequest) (*models.User, error) {
	user, err := s.Repo.GetUserById(userId)
	if err != nil {
		return nil, err
	}

	user.Name = req.Name
	user.Email = req.Email
	user.NIM = req.NIM
	user.Fakultas = req.Fakultas
	user.Prodi = req.Prodi

	err = s.Repo.UpdateUser(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// Sign in
func (s *UserService) SignIn(req models.SignInRequest) (*models.AuthResponse, error) {
	user, err := s.Repo.GetUserByEmail(req.Email)
	if err != nil {
		return nil, errors.New("email atau password salah")
	}

	if !utils.CheckPassword(req.Password, user.Password) {
		return nil, errors.New("email atau password salah")
	}

	token, err := utils.GenerateJWT(user.Id, user.Name, user.Role)
	if err != nil {
		return nil, errors.New("failed to generate token")
	}

	return &models.AuthResponse{
		Id:       user.Id,
		Name:     user.Name,
		Email:    user.Email,
		NIM:      user.NIM,
		Fakultas: user.Fakultas,
		Prodi:    user.Prodi,
		Role:     user.Role,
		Token:    token,
	}, nil
}
