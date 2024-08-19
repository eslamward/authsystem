package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {

	newpassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", err
	}
	return string(newpassword), err
}

func ComparePassword(hased, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hased), []byte(password))
	return err == nil
}
