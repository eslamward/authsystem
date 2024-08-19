package users

import (
	"errors"
	"fmt"
	"net/mail"

	"github.com/eslamward/authsystem/pkg/models"
)

func validateUser(user models.User) error {
	if len(user.Password) < 8 {
		return errors.New("password must be at leaset 8 character")
	}
	email, err := mail.ParseAddress(user.Email)
	if err != nil {
		return err
	}
	fmt.Println(email)
	return nil
}
