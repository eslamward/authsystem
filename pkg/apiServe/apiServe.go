package apiserve

import (
	"github.com/eslamward/authsystem/pkg/routing"
	"github.com/eslamward/authsystem/pkg/store"
	"github.com/eslamward/authsystem/pkg/users"
	"github.com/gin-gonic/gin"
)

type APIServe struct {
	Address string
	Store   *store.MainStore
}

func NewAPIServe(address string, store *store.MainStore) *APIServe {
	return &APIServe{
		Address: address,
		Store:   store,
	}
}

func (as *APIServe) Serve(router *gin.Engine) error {
	userServices := users.NewUserServices(as.Store.UserStore)
	routing.RegisterRouting(router, *userServices)
	return router.Run(as.Address)

}
