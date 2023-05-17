package request

import (
	"strings"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/pkg/utils/auth"
	"github.com/labstack/echo/v4"
)

// StoreUserRequest is the request to store a user in the database
type StoreUserRequest struct {
	Request
	ID       string `form:"id" json:"id" validate:"required,unique=users;id" swaggerignore:"true"`
	Email    string `form:"email" json:"email" validate:"required,email,unique=users;email" swaggerignore:"true"`
	Name     string `form:"name" json:"name" validate:"required,max=64"`
	Lastname string `form:"lastname" json:"lastname" validate:"required,max=64"`
}

func NewStoreUserRequest(c echo.Context) *StoreUserRequest {
	req := StoreUserRequest{}

	id := auth.UserID(c)
	email := auth.UserEmail(c)

	c.Bind(&req)

	req.ID = id
	req.Email = email

	return &req
}

// User return a user model with the request data
func (req *StoreUserRequest) User() model.User {
	return model.User{
		ID:       req.ID,
		Name:     strings.Trim(req.Name, " "),
		Email:    strings.Trim(req.Email, " "),
		Lastname: strings.Trim(req.Lastname, " "),
	}
}

// UpdateUserRequest is the request to update a user in the database
type UpdateUserRequest struct {
	ID       string `form:"id" json:"id" validate:"required,exists=users;id" swaggerignore:"true"`
	Name     string `form:"name" json:"name" validate:"omitempty,max=64"`
	Lastname string `form:"lastname" json:"lastname" validate:"omitempty,max=64"`
}

func NewUpdateUserRequest(c echo.Context) *UpdateUserRequest {
	req := UpdateUserRequest{}

	id := auth.UserID(c)

	c.Bind(&req)

	req.ID = id

	return &req
}

// Data returns data to update a user in the database
func (req *UpdateUserRequest) Data() map[string]interface{} {
	return map[string]interface{}{
		"name":     req.Name,
		"lastname": req.Lastname,
	}
}

type SearchUserByEmailRequest struct {
	Search string `query:"search" validate:"required"`
}

func NewSearchUserByEmailRequest(c echo.Context) *SearchUserByEmailRequest {
	req := SearchUserByEmailRequest{}

	c.Bind(&req)

	return &req
}
