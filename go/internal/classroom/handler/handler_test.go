package handler_test

import (
	"fmt"
	"io"
	"net/http/httptest"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/validation"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

const (
	METHOD_GET    = "GET"
	METHOD_POST   = "POST"
	METHOD_PUT    = "PUT"
	METHOD_DELETE = "DELETE"
)

func request(method, path string, body io.Reader, headers map[string]string, db *gorm.DB) (*httptest.ResponseRecorder, echo.Context) {
	route := fmt.Sprintf("/api/%s", path)

	req := httptest.NewRequest(method, route, body)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	for header, value := range headers {
		req.Header.Set(header, value)
	}

	rec := httptest.NewRecorder()

	e := echo.New()

	e.HTTPErrorHandler = errors.Handler

	e.Validator = validation.SetUpValidator(db)

	c := e.NewContext(req, rec)

	c.SetPath(route)

	return rec, c
}

func createTestUser(db *gorm.DB) *model.User {
	user := &model.User{
		ID:       gofakeit.UUID(),
		Name:     gofakeit.Name(),
		Lastname: gofakeit.LastName(),
		Email:    gofakeit.Email(),
	}

	db.Create(user)
	return user
}
