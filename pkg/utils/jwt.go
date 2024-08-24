package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const SECRET_KEY = "SECret_KeY"

func GenerateToken(email string, id int) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"userId": id,
		"exp":    time.Now().Add(time.Second * 60).Unix(),
	})

	return token.SignedString([]byte(SECRET_KEY))
}

func ValidToken(token string) (int, error) {

	tk, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {

		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, errors.New("unexpected method function")
		}
		return []byte(SECRET_KEY), nil
	})

	if err != nil {
		return 0, errors.New(err.Error())
	}
	validToken := tk.Valid

	if !validToken {
		return 0, errors.New("invalid token")
	}

	clamis, ok := tk.Claims.(jwt.MapClaims)
	if !ok {
		return 0, errors.New("invalid token claims")
	}
	return int(clamis["userId"].(float64)), nil
}
