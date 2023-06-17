package model

import "gorm.io/gorm"

const (
	POST_TYPE_USER_POST = iota
	POST_TYPE_CLASS_TEST
)

const (
	POSTEABLE_TYPE_SECTION = "section"
	POSTEABLE_TYPE_CLASS   = "class"
)

// Post is a struct that represents a post in the database.
type Post struct {
	BigID
	PosteableType   string     `gorm:"not null" json:"posteableType"`
	PosteableID     uint       `gorm:"not null" json:"posteableId"`
	Content         string     `gorm:"not null" json:"content"`
	UserID          string     `gorm:"foreignKey;not null" json:"userId"`
	Type            uint       `gorm:"not null" json:"type"`
	AuthorIsTeacher bool       `gorm:"-" json:"authorIsTeacher"`
	Class           *Class     `gorm:"-" json:"class,omitempty"`
	Section         *Section   `gorm:"-" json:"section,omitempty"`
	User            *User      `json:"user,omitempty"`
	Comments        *[]Comment `json:"comments,omitempty"`
	Files           []File     `gorm:"polymorphic:Fileable;" json:"files,omitempty"`
	Timestamps
}

func (post *Post) AfterFind(tx *gorm.DB) (err error) {
	switch post.PosteableType {
	case POSTEABLE_TYPE_CLASS:
		var class Class
		tx.Model(&Class{}).Where("id = ?", post.PosteableID).First(&class)
		post.Class = &class

		if(class.OwnerID == post.UserID) {
			post.AuthorIsTeacher = true
		}

	case POSTEABLE_TYPE_SECTION:
		var section Section
		tx.Model(&Section{}).Joins("Class").Where("sections.id = ?", post.PosteableID).First(&section)
		post.Section = &section

		if(section.Class.OwnerID == post.UserID) {
			post.AuthorIsTeacher = true
		}
	}

	return nil
}
