package models

import "time"

type User struct {
	ID        int       `json:"id"`
	Type      string    `json:"type"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func NewUser(id int, ty, email, password string, createdAt, updatedAt time.Time) *User {
	return &User{
		ID:        id,
		Type:      ty,
		Email:     email,
		Password:  password,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}
