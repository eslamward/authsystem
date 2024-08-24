package routing

import (
	"github.com/eslamward/authsystem/pkg/middelware"
	"github.com/eslamward/authsystem/pkg/users"
	"github.com/gin-gonic/gin"
)

func RegisterRouting(router *gin.Engine, userServices users.UserServices) {

	auth := router.Group("/")
	auth.Use(middelware.Authentication)

	router.POST("/auth/register", userServices.RegisteUser)
	router.POST("/auth/login", userServices.Login)
	router.POST("/auth/validate", userServices.ValidateToken)
	auth.GET("users", userServices.GetAllUsers)
}
