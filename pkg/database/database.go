package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type DatabaseConnection struct {
	db *sql.DB
}

func NewDatabaseConnection(user, password string) *DatabaseConnection {
	statment := fmt.Sprintf("host=localhost port=5432 user=%v password=%v dbname=helpdesk sslmode=disable", user, password)
	db, err := sql.Open("postgres", statment)

	if err != nil {
		log.Fatal(err.Error())
	}

	return &DatabaseConnection{
		db: db,
	}

}

func (dc *DatabaseConnection) IntializeDatabase() (*sql.DB, error) {
	err := dc.createTables()
	if err != nil {
		return nil, err
	}
	return dc.db, nil
}

func (dc *DatabaseConnection) createTables() error {

	_, err := dc.db.Exec(userTable)
	if err != nil {
		return err
	}
	return nil
}
