package model

import (
	"time"
)

// EvaluationDate vinculates a class module with a evaluation date
type EvaluationDate struct {
	ModuleID  uint      `gorm:"primaryKey;foreignKey;not null" json:"moduleId"`
	SectionID uint      `gorm:"primaryKey;foreignKey;not null" json:"sectionId"`
	Date      time.Time `gorm:"type:TIMESTAMP WITH TIME ZONE;not null" json:"date"`
}
