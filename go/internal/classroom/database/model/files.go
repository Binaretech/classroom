package model

import (
	"fmt"

	"github.com/spf13/viper"
	"gorm.io/gorm"
)

const (
	FILE_TYPE_PROFILE_IMAGE = iota
	FILE_TYPE_POST_ATTACHMENT
)

const (
	FILEABLE_TYPE_USERS = "users"
	FILEABLE_TYPE_POSTS = "posts"
)

// File represents a file.
type File struct {
	BigID
	Key          string `json:"key"`
	Type         uint8  `json:"type"`
	Bucket       string `json:"bucket"`
	MimeType     string `gorm:"size:32;not null" json:"mimeType"`
	FileableType string `gorm:"size:30;not null" json:"fileableType"`
	FileableID   string `gorm:"size:64" json:"fileableId"`
	Url          string `gorm:"-" json:"url"`
	Timestamps
}

func (file *File) AfterFind(tx *gorm.DB) (err error) {
	file.Url = fmt.Sprintf("%s/%s/%s", viper.GetString("s3_url"), file.Bucket, file.Key)

	return nil
}
