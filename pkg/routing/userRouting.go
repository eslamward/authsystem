package routing

import (
	"github.com/eslamward/authsystem/pkg/users"
	"github.com/gin-gonic/gin"
)

func RegisterRouting(router *gin.Engine, userServices users.UserServices) {
	router.POST("/user/register", userServices.RegisteUser)
	router.POST("/user/login", userServices.Login)
}
