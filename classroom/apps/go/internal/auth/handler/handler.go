package handler

import (
	"context"
	"net/http"

	"github.com/Binaretech/classroom/internal/auth/auth"
	"github.com/Binaretech/classroom/internal/auth/database"
	"github.com/Binaretech/classroom/internal/auth/database/schema"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/hash"
	"github.com/Binaretech/classroom/pkg/lang"
	"github.com/Binaretech/classroom/pkg/utils/response"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthHandler struct {
	db *mongo.Database
}

func New(db *mongo.Database) *AuthHandler {
	return &AuthHandler{
		db: db,
	}
}

type AuthResponse struct {
	Token *auth.TokenDetails `json:"token"`
	User  schema.User        `json:"user"`
}

// Register a new user and returns the login tokens
// @Summary      Register a new user
// @Description  Register a new user
// @Tags         Auth
// @Param        user body RegisterRequest true "Register data"
// @Accept       json
// @Produce      json
// @Success      201  {object}  AuthResponse
// @Router       /register [get]
func (h *AuthHandler) Register(c echo.Context) error {
	req := RegisterRequest{}
	if err := c.Bind(&req); err != nil {
		return err
	}

	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err)
	}

	collection := database.Users(h.db)

	user := schema.User{
		Email:    req.Email,
		Password: hash.Bcrypt(req.Password),
	}

	if err := user.Create(collection); err != nil {
		return err
	}

	token, err := user.Authenticate()
	if err != nil {
		return err
	}

	return token.StoreCookie(c).JSON(http.StatusCreated, AuthResponse{
		User:  user,
		Token: token,
	})

}

// Login authenticate the user and returns token data
// @Summary      Login
// @Description  Login the user
// @Tags         Auth
// @Param        user body LoginRequest true "Login data"
// @Accept       json
// @Produce      json
// @Success      200  {object}  AuthResponse
// @Router       /login [post]
func (h *AuthHandler) Login(c echo.Context) error {
	req := LoginRequest{}

	if err := c.Bind(&req); err != nil {
		return err
	}

	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err)
	}

	users := database.Users(h.db)

	var user schema.User

	if err := users.FindOne(context.Background(), bson.M{"email": req.Email}).Decode(&user); err != nil {
		return err
	}

	if !hash.CompareHash(user.Password, req.Password) {
		return response.ResponseError(c, http.StatusUnauthorized, lang.TransCtx(c, "login error"))
	}

	token, err := user.Authenticate()
	if err != nil {
		return err
	}

	return token.StoreCookie(c).JSON(http.StatusOK, AuthResponse{
		User:  user,
		Token: token,
	})
}

// Verify the auth status
// @Summary      Verify the auth status
// @Description  Verify the auth status
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Success      204
// @Router       / [get]
func (h *AuthHandler) Verify(c echo.Context) error {
	details, valid := auth.Verify(c)

	if !valid {
		return errors.NewUnauthenticated()
	}

	c.Response().Header().Add("X-Auth-User", details.UserID)
	c.Response().Header().Add("X-Auth-User-Email", details.Email)

	return c.NoContent(http.StatusNoContent)
}

type refreshRequest struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}

// RefreshToken refresh the token and returns the new token
func (h *AuthHandler) RefreshToken(c echo.Context) error {
	req := refreshRequest{}

	if err := c.Bind(&req); err != nil {
		return err
	}

	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err)
	}

	userID, valid := auth.VerifyRefreshToken(req.RefreshToken)
	if !valid {
		return c.NoContent(http.StatusUnauthorized)
	}

	id, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	users := database.Users(h.db)
	var user schema.User
	if err := users.FindOne(context.Background(), bson.M{"_id": id}).Decode(&user); err != nil {
		return err
	}

	token, err := user.Authenticate()
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"user":  user,
		"token": token,
	})

}

func (h *AuthHandler) GoogleAuth(c echo.Context) error {
	req := googleAuthRequest{}

	if err := c.Bind(&req); err != nil {
		return err
	}

	if err := c.Validate(req); err != nil {
		return err
	}

	var email string
	var id string

	if info, err := auth.GoogleAuth(req.IdToken); err != nil {
		return err
	} else {
		email = info.Email
		id = info.UserId
	}

	users := database.Users(h.db)
	user := new(schema.User)

	if err := user.FindByEmail(users, email); err == mongo.ErrNoDocuments {
		user = &schema.User{
			Email:    email,
			Password: hash.Bcrypt(id),
		}

		if err := user.Create(users); err != nil {
			return err
		}

	} else if err != nil {
		return err
	}

	if token, err := user.Authenticate(); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, map[string]any{
			"user":  user,
			"token": token,
		})
	}

}

// Logout the user and invalidate the token
// @Summary      Logout the user
// @Description  Logout the user
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Success      204
// @Router       /logout [get]
func (h *AuthHandler) Logout(c echo.Context) error {
	details, valid := auth.Verify(c)

	if !valid {
		return c.NoContent(http.StatusUnauthorized)
	}

	if err := auth.DeleteAuth(details.AccessUUUID, details.RefreshUUID); err != nil {
		return err
	}

	return c.NoContent(http.StatusNoContent)
}
