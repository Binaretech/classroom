package handler_test

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/handler"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestHasProfile(t *testing.T) {
	db, _ := database.Connect()
	handler := handler.New(db)

	t.Run("has profile", func(t *testing.T) {
		user := createTestUser(db)

		rec, c := request(http.MethodGet, "/api/user", nil, map[string]string{
			echo.HeaderContentType: echo.MIMEApplicationJSON,
			"X-Auth-User":          user.ID,
		}, db)

		if assert.NoError(t, handler.User(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)

			response := model.User{}

			json.Unmarshal(rec.Body.Bytes(), &response)

			assert.Equal(t, user.ID, response.ID)
			assert.Equal(t, user.Name, response.Name)
			assert.Equal(t, user.Lastname, response.Lastname)
		}
	})

	t.Run("no profile", func(t *testing.T) {
		rec, c := request(http.MethodGet, "/api/user", nil, map[string]string{
			echo.HeaderContentType: echo.MIMEApplicationJSON,
			"X-Auth-User":          gofakeit.UUID(),
		}, db)

		if assert.NoError(t, handler.User(c)) {
			assert.Equal(t, http.StatusNotFound, rec.Code, rec.Body.String())
		}
	})
}

func TestStoreUser(t *testing.T) {
	db, _ := database.Connect()
	handler := handler.New(db)

	t.Run("store user", func(t *testing.T) {
		t.Parallel()
		user := model.User{
			Name:     gofakeit.Name(),
			Lastname: gofakeit.LastName(),
		}

		ID := gofakeit.UUID()

		body, _ := json.Marshal(user)

		rec, c := request(http.MethodPost, "/api/user", bytes.NewBuffer(body), map[string]string{
			echo.HeaderContentType: echo.MIMEApplicationJSON,
			"X-Auth-User":          ID,
			"X-Auth-User-Email":    gofakeit.Email(),
		}, db)

		if assert.NoError(t, handler.StoreUser(c)) {
			body, _ := io.ReadAll(rec.Body)
			assert.Equal(t, http.StatusCreated, rec.Code, string(body))
		}

	})

	t.Run("user already exists", func(t *testing.T) {
		t.Parallel()
		user := createTestUser(db)

		body, _ := json.Marshal(user)

		_, c := request(http.MethodPost, "/api/user", bytes.NewBuffer(body), map[string]string{
			echo.HeaderContentType: echo.MIMEApplicationJSON,
			"X-Auth-User":          user.ID,
		}, db)

		assert.Error(t, handler.StoreUser(c))

	})
}

func TestUpdateUser(t *testing.T) {
	db, _ := database.Connect()
	handler := handler.New(db)

	t.Run("update user", func(t *testing.T) {
		user := createTestUser(db)

		user.Name = gofakeit.Name()
		user.Lastname = gofakeit.LastName()

		body, _ := json.Marshal(user)

		rec, c := request(http.MethodPut, "/user", bytes.NewBuffer(body), map[string]string{
			echo.HeaderContentType: echo.MIMEApplicationJSON,
			"X-Auth-User":          user.ID,
		}, db)

		if assert.NoError(t, handler.UpdateUser(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("update user with invalid id", func(t *testing.T) {
		user := createTestUser(db)
		user.Name = gofakeit.Name()
		user.Lastname = gofakeit.LastName()

		body, _ := json.Marshal(user)

		rec, c := request(http.MethodPut, "/user", bytes.NewBuffer(body), map[string]string{
			echo.HeaderContentType: echo.MIMEApplicationJSON,
			"X-Auth-User":          gofakeit.UUID(),
		}, db)

		if assert.NoError(t, handler.UpdateUser(c)) {
			assert.Equal(t, http.StatusUnprocessableEntity, rec.Code)
		}
	})
}
