package routing

import (
	"github.com/eslamward/authsystem/pkg/users"
	"github.com/gin-gonic/gin"
)

func RegisterRouting(router *gin.Engine, userServices users.UserServices) {
	router.POST("/auth/register", userServices.RegisteUser)
	router.POST("/auth/login", userServices.Login)
}
