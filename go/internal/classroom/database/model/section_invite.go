package model

type SectionInvite struct {
	BigID
	SectionId uint   `gorm:"not null" json:"sectionId"`
	Email     string `gorm:"not null" json:"email"`
	Timestamps
}
