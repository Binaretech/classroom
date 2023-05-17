package resource

import (
	"github.com/Binaretech/classroom/internal/classroom/database/model"
)

type ClassResource struct {
	model.BigID
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	IsStudent   bool    `json:"isStudent"`
	IsTeacher   bool    `json:"isTeacher"`
	model.Timestamps
}
