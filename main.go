package main

import (
	"log"
	"os"

	apiserve "github.com/eslamward/authsystem/pkg/apiServe"
	"github.com/eslamward/authsystem/pkg/database"
	"github.com/eslamward/authsystem/pkg/store"
	"github.com/gin-gonic/gin"
)

func main() {

	if len(os.Args) < 3 {
		log.Fatal("please enter username and password of database")
	}

	router := gin.Default()

	databaseConnection := database.NewDatabaseConnection(os.Args[1], os.Args[2])
	db, err := databaseConnection.IntializeDatabase()
	if err != nil {
		log.Fatal(err.Error())
	}
	userStore := store.NewUserStore(db)
	mainStore := store.NewMainStore(userStore)

	apiServe := apiserve.NewAPIServe(":8080", mainStore)

	apiServe.Serve(router)
}
