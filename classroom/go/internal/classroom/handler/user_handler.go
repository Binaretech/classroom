package handler

import (
	"net/http"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/handler/request"
	"github.com/Binaretech/classroom/internal/classroom/handler/resource"
	"github.com/Binaretech/classroom/internal/classroom/handler/service"
	"github.com/Binaretech/classroom/internal/classroom/lang"
	"github.com/Binaretech/classroom/pkg/utils/auth"
	"github.com/labstack/echo/v4"
)

// User handler look up the user's data in the database and return it or returns 404 if not found
// @Summary      Get user
// @Description  Get authenticated user
// @Tags         User
// @Accept       json
// @Produce      json
// @Success      200  {object}  model.User
// @Router       /users [get]
func (h *Handler) User(c echo.Context) error {
	userID := auth.UserID(c)

	user, err := service.GetUser(h.DB, userID)

	if err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, user)
}

// StoreUser create a new user in the database with the request data
// @Summary      Create user
// @Description  Create a new user
// @Tags         User
// @Accept       json
// @Produce      json
// @Param        user body request.StoreUserRequest true "User data"
// @Success      201  {object}  model.User
// @Router       /users [post]
func (h *Handler) StoreUser(c echo.Context) error {
	req := request.NewStoreUserRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	user := req.User()

	image, _ := c.FormFile("image")

	if err := service.StoreUser(h.DB, &user, image); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, user)
}

// UpdateUser update the user's data in the database with the request data
// @Summary      Update user
// @Description  Update authenticated user
// @Tags         User
// @Accept       json
// @Produce      json
// @Param        user body request.UpdateUserRequest true "User data"
// @Success      200  {object}  resource.MessageResource
// @Router       /users [put]
func (h *Handler) UpdateUser(c echo.Context) error {
	req := request.NewUpdateUserRequest(c)

	req.ID = auth.UserID(c)

	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err)
	}

	if err := h.DB.Model(&model.User{}).Where("id = ?", req.ID).Updates(req.Data()).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, resource.MessageResource{
		Message: lang.TransCtx(c, "user updated"),
	})
}

// SearchUserByEmail search users by email
// @Summary      Search users by email
// @Description  Search users by email
// @Tags         User
// @Accept       json
// @Produce      json
// @Param        search query string true "Search"
// @Router       /users/search [get]
func (h *Handler) SearchUserByEmail(c echo.Context) error {
	req := request.NewSearchUserByEmailRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	users := service.SearchUsersByEmail(auth.UserID(c), h.DB, req.Search)

	return c.JSON(http.StatusOK, resource.DataResource[[]model.User]{
		Data: users,
	})
}
