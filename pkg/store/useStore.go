package store

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/eslamward/authsystem/pkg/models"
)

type UserStore interface {
	RegisteUser(models.User) (models.User, error)
	Login(string, string) (models.User, error)
	IsEmailAlreadyExist(string) (bool, error)
}

type UserStorage struct {
	db *sql.DB
}

func NewUserStore(db *sql.DB) *UserStorage {

	return &UserStorage{
		db: db,
	}
}

func (us *UserStorage) RegisteUser(user models.User) (models.User, error) {

	var id int
	const command = `INSERT INTO users(email,password,type,created_at,updated_at)
		values($1,$2,$3,$4,$5) RETURNING id`

	err := us.db.QueryRow(command,
		user.Email,
		user.Password,
		user.Type,
		user.CreatedAt,
		user.UpdatedAt).Scan(&id)

	if err != nil {
		return user, err
	}

	user.ID = id
	user.Password = ""

	return user, nil
}

func (us *UserStorage) Login(email, password string) (models.User, error) {
	var fetshedUser models.User
	statement := "SELECT * FROM users where email = $1"

	row := us.db.QueryRow(statement, email)

	err := row.Scan(
		&fetshedUser.ID,
		&fetshedUser.Email,
		&fetshedUser.Password,
		&fetshedUser.Type,
		&fetshedUser.CreatedAt,
		&fetshedUser.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return fetshedUser, errors.New("the email not registerd")
		}
		return fetshedUser, err
	}
	return fetshedUser, nil

}

func (us *UserStorage) IsEmailAlreadyExist(email string) (bool, error) {
	statement := "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)"

	var exist bool
	row := us.db.QueryRow(statement, email)
	err := row.Scan(&exist)
	if err != nil {
		return false, err
	}
	fmt.Println(exist)
	return exist, nil
}
