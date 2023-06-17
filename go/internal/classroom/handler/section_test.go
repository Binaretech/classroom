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
	"github.com/stretchr/testify/assert"
)

func TestCreateSection(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	class := &model.Class{
		Name:    "Test Class",
		OwnerID: user.ID,
	}

	db.Create(&class)

	body, _ := json.Marshal(map[string]any{
		"name":    "Test Section",
		"classId": class.ID,
	})

	rec, c := request("POST", "/sections", bytes.NewBuffer(body), map[string]string{
		"X-Auth-User": user.ID,
	}, db)

	if assert.NoError(t, handler.CreateSection(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)

		response := make(map[string]any)
		json.Unmarshal(rec.Body.Bytes(), &response)

		assert.NotNil(t, response["data"])
		assert.Equal(t, "Test Section", response["data"].(map[string]any)["name"])
	}

}

func TestAddSectionStudent(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	existingStudent := createTestUser(db)

	handler := handler.New(db)

	section := &model.Section{
		Students: []model.User{*existingStudent},
		Name:     "Test Section",
		Class: &model.Class{
			OwnerID: user.ID,
			Name:    "Test Class",
		},
	}

	db.Create(&section)

	t.Run("Add existing student to section", func(t *testing.T) {
		student := createTestUser(db)

		body, _ := json.Marshal(map[string]any{
			"email": student.Email,
		})

		rec, c := request("POST", "/sections/:id/students", bytes.NewBuffer(body), map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(section.ID))

		err := handler.AddMember(c)

		if assert.NoError(t, err, err) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("Invite new student to section", func(t *testing.T) {
		body, _ := json.Marshal(map[string]any{
			"email": "john@doe.com",
		})

		rec, c := request("POST", "/sections/:id/students", bytes.NewBuffer(body), map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(section.ID))

		err := handler.AddMember(c)

		if assert.NoError(t, err, err) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("Trying to add an existing student to a section that already has him", func(t *testing.T) {
		body, _ := json.Marshal(map[string]any{
			"email": existingStudent.Email,
		})

		_, c := request("POST", "/sections/:id/students", bytes.NewBuffer(body), map[string]string{
			"X-Auth-User": user.ID,
		}, db)

		c.SetParamNames("id")
		c.SetParamValues(fmt.Sprint(section.ID))

		err := handler.AddMember(c)

		if assert.Error(t, err) {
			var _, ok = err.(*errors.BadRequest)
			assert.True(t, ok)
		}
	})

}

func TestSectionMembers(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	section := &model.Section{
		Students: []model.User{*user},
		Class: &model.Class{
			Name:    "Test Class",
			OwnerID: user.ID,
		},
	}

	db.Create(&section)

	rec, c := request("GET", "/sections/:id/members", nil, map[string]string{
		"X-Auth-User": user.ID,
	}, db)

	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(section.ID))

	err := handler.SectionMembers(c)

	if assert.NoError(t, err, fmt.Sprintf("%T", err)) {
		assert.Equal(t, http.StatusOK, rec.Code)

		response := make(map[string]interface{})
		json.Unmarshal(rec.Body.Bytes(), &response)
		assert.NotNil(t, response["data"])
		assert.Len(t, response["data"].([]interface{}), 2)
		assert.Equal(t, 1, int(response["page"].(float64)))
		assert.Equal(t, 10, int(response["limit"].(float64)))
	}

}

func TestSectionPosts(t *testing.T) {
	db, _ := database.Connect()
	user := createTestUser(db)

	handler := handler.New(db)

	section := &model.Section{
		Students: []model.User{*user},
		Class: &model.Class{
			Name:    "Test Class",
			OwnerID: createTestUser(db).ID,
		},
	}

	db.Create(&section)

	db.Create(&model.Post{
		PosteableID: section.ID,
		PosteableType: "section",
		UserID:    user.ID,
		Content:   "Hello world",
	})

	rec, c := request("GET", "/sections/:id/posts", nil, map[string]string{
		"X-Auth-User": user.ID,
	}, db)

	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(section.ID))

	if assert.NoError(t, handler.SectionPosts(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)

		response := make(map[string]interface{})
		json.Unmarshal(rec.Body.Bytes(), &response)

		assert.NotNil(t, response["data"])
		assert.Len(t, response["data"].([]interface{}), 1)
		assert.Equal(t, 1, int(response["page"].(float64)))
		assert.Equal(t, 10, int(response["limit"].(float64)))
	}

}
