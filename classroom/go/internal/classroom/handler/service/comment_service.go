package service

import (
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"gorm.io/gorm"
)

func StoreComment(db *gorm.DB, comment *model.Comment) error {
	return db.Create(comment).Error
}
