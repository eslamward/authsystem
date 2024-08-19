package middelware

import (
	"net/http"

	"github.com/eslamward/authsystem/pkg/utils"
	"github.com/gin-gonic/gin"
)

func Authentication(context *gin.Context) {

	token := context.Request.Header.Get("authorization")
	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid token"})

	}
	userId, err := utils.ValidToken(token)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": err.Error()})

	}

	context.Set("userId", userId)
	context.Next()
}
