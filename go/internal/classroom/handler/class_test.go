package handler_test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"testing"

	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/handler"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestUserClasses(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	var classes []model.Class

	handler := handler.New(db)

	for i := 0; i < 5; i++ {
		classes = append(classes, model.Class{
			Name:    "Test Class " + fmt.Sprint(i),
			OwnerID: createTestUser(db).ID,
			Sections: []model.Section{
				{
					Name:     "Test Section",
					Students: []model.User{*user},
				},
			},
		})
	}

	db.Create(classes)

	rec, c := request("GET", "/classes", nil, map[string]string{
		"X-Auth-User": user.ID,
	}, db)

	if assert.NoError(t, handler.UserClasses(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)

		response := make(map[string]interface{})
		json.Unmarshal(rec.Body.Bytes(), &response)

		assert.NotNil(t, response["data"])
		assert.Equal(t, 1, int(response["page"].(float64)))
		assert.Equal(t, 10, int(response["limit"].(float64)))
	}

}

func TestCreateClass(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	t.Run("Create class", func(t *testing.T) {
		body, _ := json.Marshal(map[string]any{
			"name":        "Test Class",
			"description": "Test Description",
		})

		rec, c := request("POST", "/classes", bytes.NewBuffer(body), map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		if assert.NoError(t, handler.CreateClass(c)) {
			assert.Equal(t, http.StatusCreated, rec.Code)

			response := make(map[string]interface{})
			json.Unmarshal(rec.Body.Bytes(), &response)

			assert.NotNil(t, response["data"])
			assert.Equal(t, "Test Class", response["data"].(map[string]interface{})["name"])
		}
	})

	t.Run("Create class with invalid name", func(t *testing.T) {
		body, _ := json.Marshal(map[string]any{
			"name":        "",
			"description": "Test Description",
		})

		_, c := request("POST", "/classes", bytes.NewBuffer(body), map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		err := handler.CreateClass(c)

		assert.Error(t, err)
		_, ok := err.(*echo.HTTPError)
		assert.True(t, ok)
	})
}

func TestDeleteClass(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	t.Run("Delete class", func(t *testing.T) {
		class := model.Class{
			Name:     "Test Class",
			OwnerID:  user.ID,
			Archived: true,
		}

		db.Create(&class)

		rec, c := request("DELETE", fmt.Sprintf("/classes/%d", class.ID), nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(class.ID))

		if assert.NoError(t, handler.DeleteClass(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("Delete class with invalid id", func(t *testing.T) {

		_, c := request("DELETE", "/classes/0", nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues("0")

		err := handler.DeleteClass(c)

		assert.Error(t, err)
		_, ok := err.(*echo.HTTPError)
		assert.True(t, ok)
	})
}

func TestClassSections(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	t.Run("Test valid class sections", func(t *testing.T) {
		class := model.Class{
			Name:    "Test Class",
			OwnerID: user.ID,
			Sections: []model.Section{
				{
					Name: "Section 1",
				},
			},
		}

		db.Create(&class)

		rec, c := request("GET", fmt.Sprintf("/classes/%d/sections", class.ID), nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(class.ID))

		err := handler.GetClassSections(c)

		if assert.NoError(t, err) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("Test invalid class sections", func(t *testing.T) {
		_, c := request("GET", "/classes/0/sections", nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues("0")

		err := handler.GetClassSections(c)

		if assert.Error(t, err) {
			_, ok := err.(*errors.NotFound)
			assert.True(t, ok)
		}

	})
}

func TestArchiveClass(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	t.Run("Test archive valid class", func(t *testing.T) {
		class := model.Class{
			Name:    "Test Class",
			OwnerID: user.ID,
		}

		db.Create(&class)

		rec, c := request(METHOD_POST, fmt.Sprintf("/classes/%d/archive", class.ID), nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(class.ID))

		err := handler.ArchiveClass(c)

		if assert.NoError(t, err) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("Test archive invalid class", func(t *testing.T) {
		_, c := request(METHOD_POST, "/classes/0/archive", nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues("10000000000")

		err := handler.GetClassSections(c)

		if assert.Error(t, err) {
			_, ok := err.(*errors.NotFound)
			assert.True(t, ok)
		}
	})

}

func TestUnarchiveClass(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	t.Run("Test unarchive valid class", func(t *testing.T) {
		class := model.Class{
			Name:     "Test Class",
			OwnerID:  user.ID,
			Archived: true,
		}

		db.Create(&class)

		rec, c := request(METHOD_POST, fmt.Sprintf("/classes/%d/unarchive", class.ID), nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(class.ID))

		err := handler.UnarchiveClass(c)

		if assert.NoError(t, err) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("Test unarchive invalid class", func(t *testing.T) {
		_, c := request(METHOD_POST, "/classes/0/unarchive", nil, map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues("10000000000")

		err := handler.GetClassSections(c)

		if assert.Error(t, err) {
			_, ok := err.(*errors.NotFound)
			assert.True(t, ok)
		}
	})

}
