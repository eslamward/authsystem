package routing

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSConfig(router *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST"}
	config.AllowHeaders = []string{"Content-Type", "Authorization"}
	config.AllowCredentials = true
	router.Use(cors.New(config))
}
