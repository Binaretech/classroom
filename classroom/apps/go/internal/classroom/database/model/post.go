package model

const (
	POST_TYPE_USER_POST = iota
	POST_TYPE_CLASS_TEST
)

// Post is a struct that represents a post in the database.
type Post struct {
	BigID
	SectionID uint       `gorm:"foreignKey;not null" json:"sectionId"`
	Content   string     `gorm:"not null" json:"content"`
	UserID    string     `gorm:"foreignKey;not null" json:"userId"`
	Type      uint       `gorm:"not null" json:"type"`
	User      *User      `json:"user,omitempty"`
	Comments  *[]Comment `json:"comments,omitempty"`
	Files     []File     `gorm:"polymorphic:Fileable;" json:"files,omitempty"`
	Timestamps
}
