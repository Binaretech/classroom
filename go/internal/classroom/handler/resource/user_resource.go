package resource

import (
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"gorm.io/gorm"
)

type UserResponse struct {
	User model.User `json:"user"`
}

type UserResource struct {
	ID           string       `json:"id"`
	ProfileImage []model.File `gorm:"polymorphic:Fileable;" json:"profileImage,omitempty"`
	Email        string       `json:"email"`
	Name         string       `json:"name"`
	Lastname     string       `json:"lastname"`
	model.Timestamps
	model.SoftDeletable
}

func (resource *UserResource) AfterFind(tx *gorm.DB) (err error) {
	return tx.Model(resource).Association("ProfileImage").
		Find(&resource.ProfileImage,
			"type = ? AND fileable_type = ? and fileable_id = ?",
			model.FILE_TYPE_PROFILE_IMAGE,
			model.FILEABLE_TYPE_USERS,
			resource.ID,
		)
}
