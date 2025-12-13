package models

import "time"

type User struct {
	Id        int64     `pg:"id,pk" json:"id"`
	Name      string    `pg:"name" json:"name"`
	Email     string    `pg:"email,unique" json:"email"`
	NIM       string    `pg:"nim" json:"nim"`
	Password  string    `pg:"password" json:"-"`
	Fakultas  string    `pg:"fakultas" json:"fakultas"`
	Prodi     string    `pg:"prodi" json:"prodi"`
	Role      string    `pg:"role,default:'user'" json:"role"`
	CreatedAt time.Time `pg:"created_at,default:now()" json:"created_at"`
}

type Report struct {
	Id          int64     `pg:"id,pk" json:"id"`
	UserId      int64     `pg:"user_id,notnull" json:"user_id"`
	User        *User     `pg:"rel:has-one" json:"user,omitempty"`
	Title       string    `pg:"title" json:"title"`
	Description string    `pg:"description" json:"description"`
	Category    string    `pg:"category" json:"category"`
	Location    string    `pg:"location" json:"location"`
	Priority    string    `pg:"priority,default:'medium'" json:"priority"`
	Status      string    `pg:"status,default:'menunggu'" json:"status"`
	PictPath    string    `pg:"pict_path" json:"pict_path"`
	CreatedAt   time.Time `pg:"created_at,default:now()" json:"created_at"`
	UpdatedAt   time.Time `pg:"updated_at,default:now()" json:"updated_at"`
}

type SignUpRequest struct {
	Name     string `json:"name" binding:"required,min=2"`
	Email    string `json:"email" binding:"required,email"`
	NIM      string `json:"nim" binding:"required"`
	Fakultas string `json:"fakultas" binding:"required"`
	Prodi    string `json:"prodi" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
}

type SignInRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Id       int64  `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	NIM      string `json:"nim"`
	Fakultas string `json:"fakultas"`
	Prodi    string `json:"prodi"`
	Role     string `json:"role"`
	Token    string `json:"token"`
}

type CreateReportRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Category    string `json:"category" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Priority    string `json:"priority"`
	Picture     string `json:"picture"`
}

type MarkAsDone struct {
	Status string `json:"status"`
}
