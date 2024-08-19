package users

import (
	"net/http"
	"time"

	"github.com/eslamward/authsystem/pkg/models"
	"github.com/eslamward/authsystem/pkg/store"
	"github.com/eslamward/authsystem/pkg/utils"
	"github.com/gin-gonic/gin"
)

type UserServices struct {
	Store store.UserStore
}

func NewUserServices(store store.UserStore) *UserServices {
	return &UserServices{
		Store: store,
	}
}

func (us *UserServices) RegisteUser(context *gin.Context) {
	var user models.User

	err := context.ShouldBind(&user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	exist, err := us.Store.IsEmailAlreadyExist(user.Email)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if exist {
		context.JSON(http.StatusBadRequest, gin.H{"message": "email already exist"})
		return
	}
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	user.Type = "user"

	password, err := utils.HashPassword(user.Password)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	user.Password = password
	err = validateUser(user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	createdUser, err := us.Store.RegisteUser(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	token, err := utils.GenerateToken(createdUser.Email, createdUser.ID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	context.JSON(http.StatusCreated, gin.H{"message": "Created Successfully", "user": createdUser, "token": token})

}

func (us *UserServices) Login(context *gin.Context) {
	var user models.User

	err := context.ShouldBind(&user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	exist, err := us.Store.IsEmailAlreadyExist(user.Email)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	if !exist {
		context.JSON(http.StatusBadRequest, gin.H{"message": "email not registered"})
		return
	}

	fetshedUser, err := us.Store.Login(user.Email, user.Password)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	isMatched := utils.ComparePassword(fetshedUser.Password, user.Password)
	if !isMatched {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "password didn't match"})
		return
	}

	token, err := utils.GenerateToken(fetshedUser.Email, fetshedUser.ID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	fetshedUser.Password = ""

	context.JSON(http.StatusOK, gin.H{"message": "login successfuly", "user": fetshedUser, "token": token})

}
