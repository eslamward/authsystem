package middelware

import (
	"fmt"
	"net/http"

	"github.com/eslamward/authsystem/pkg/utils"
	"github.com/gin-gonic/gin"
)

func Authentication(context *gin.Context) {

	token := context.Request.Header.Get("Authorization")
	fmt.Println("Tokkkkkken -HHHHHH", token)
	// tk := context.Request.Cookies()
	// ts := context.Request.Header.Values("Cookie")
	// if len(ts) < 1 {
	// 	context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "no token provided"})

	// }
	// token := ts[0][6:]
	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid token"})

	}
	userId, err := utils.ValidToken(token)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": err.Error()})

	}

	context.Set("userId", userId)
	context.Next()
}
