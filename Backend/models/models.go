package models

import "time"

type User struct {
	Id        int64     `pg:"id,pk" json:"id"`
	Name      string    `pg:"name" json:"name"`
	Email     string    `pg:"email,unique" json:"email"`
	Password  string    `pg:"password" json:"-"`
	Role      string    `pg:"role,default:'user'" json:"role"`
	CreatedAt time.Time `pg:"created_at,default:now()" json:"created_at"`
}

type Report struct {
	Id          int64  `pg:"id,pk" json:"id"`
	UserId      int64  `pg:"user_id,notnull" json:"user_id"`
	User        *User  `pg:"rel:has-one" json:"user,omitempty"`
	Title       string `pg:"title" json:"title"`
	Description string `pg:"description" json:"description"`
	// TODO: Add default value for status
	Status    string    `pg:"status" json:"status"`
	CreatedAt time.Time `pg:"created_at,default:now()" json:"created_at"`
	UpdatedAt time.Time `pg:"updatedAt,default:now()" json:"updated_at"`
}

type SignUpRequest struct {
	Name     string `json:"name" binding:"required,min=2"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type SignInRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Id    int64  `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
	Token string `json:"token"`
}

type CreateReportRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
}

type MarkAsDone struct {
	Status string `json:"status"`
}
