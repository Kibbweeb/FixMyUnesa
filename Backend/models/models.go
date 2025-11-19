package models

type User struct {
	Id        int64  `pg:"id,pk" json:"id"`
	Name      string `pg:"name" json:"name"`
	Email     string `pg:"email,unique" json:"email"`
	Password  string `pg:"password" json:"-"`
	Role      string `pg:"role,default:'user'" json:"role"`
	CreatedAt string `pg:"created_at,default:now()" json:"created_at"`
}

type SignUpRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
