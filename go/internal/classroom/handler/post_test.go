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
	"github.com/stretchr/testify/assert"
)

// Test store post
func TestStorePost(t *testing.T) {
	database, _ := database.Connect()
	user := createTestUser(database)

	h := handler.New(database)

	section := &model.Section{
		Students: []model.User{*user},
		Class: &model.Class{
			Name:    "Test Class",
			OwnerID: createTestUser(database).ID,
		},
	}

	database.Create(&section)

	body, _ := json.Marshal(map[string]any{
		"title":   "Test Post",
		"content": "Test Content",
		"section": section.ID,
	})

	rec, c := request("POST", "/sections/:id/posts", bytes.NewBuffer(body), map[string]string{
		"X-Auth-User": user.ID,
	}, database)

	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(section.ID))

	if assert.NoError(t, h.StoreSectionPost(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)

		response := make(map[string]interface{})
		_ = json.Unmarshal(rec.Body.Bytes(), &response)

		assert.NotNil(t, response["data"])
		assert.Equal(t, "Test Content", response["data"].(map[string]interface{})["content"])
	}
}
