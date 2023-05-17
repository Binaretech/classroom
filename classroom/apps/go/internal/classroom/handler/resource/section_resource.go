package resource

import "github.com/Binaretech/classroom/internal/classroom/database/model"

type SectionResource struct {
	ID      uint           `json:"id"`
	Name    string         `json:"name"`
	ClassID uint           `json:"classId"`
	Class   *ClassResource `json:"class,omitempty"`
	model.Timestamps
}
