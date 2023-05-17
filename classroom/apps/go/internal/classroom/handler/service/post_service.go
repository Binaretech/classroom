package service

import (
	"fmt"
	"io"
	"mime/multipart"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/storage"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

// GetSectionPosts returns the posts of a section
func GetSectionPosts(db *gorm.DB, userId string, id string) *gorm.DB {
	usersQuery := db.Table(
		"(? UNION ? UNION ?) as users",
		db.Model(&model.User{}).
			Joins("JOIN students ON students.user_id = users.id").
			Select("users.*, students.section_id").
			Where("students.section_id = ?", id),
		db.Model(&model.User{}).
			Joins("JOIN classes ON classes.owner_id = users.id").
			Joins("JOIN sections ON sections.class_id = classes.id").
			Select("users.*, sections.id").
			Where("sections.id = ?", id),
		db.Model(&model.User{}).
			Joins("JOIN teachers ON teachers.user_id = users.id").
			Select("users.*, teachers.section_id").
			Where("teachers.section_id = ?", id),
	)

	urlsQuery := db.Model(&model.Post{}).
		Joins("JOIN files ON files.fileable_id = posts.id::text AND files.fileable_type = ?", model.FILEABLE_TYPE_POSTS).
		Select("array_agg(concat(?::text,'/', bucket, '/', key)) as urls, posts.id", viper.GetString("s3_url")).
		Where("files.type = ?", model.FILE_TYPE_POST_ATTACHMENT).
		Group("posts.id")

	return db.
		Model(&model.Post{}).
		Preload("User").Preload("User.ProfileImage").
		Joins("JOIN (?) users ON posts.section_id = users.section_id", usersQuery).
		Joins("LEFT JOIN (?) urls ON urls.id = posts.id", urlsQuery).
		Where("posts.section_id = ? AND users.id = ?", id, userId).
		Select("posts.*, urls.urls").
		Order("created_at DESC")

}

func GetPostAuthor(db *gorm.DB, post *model.Post) error {
	var author model.User

	if err := db.Model(post).Association("Author").Find(&author); err != nil {
		return err
	}

	if err := db.First(&author.ProfileImage, "fileable_type = ? AND fileable_id = ? AND type = ?", model.FILEABLE_TYPE_USERS, author.ID, model.FILE_TYPE_PROFILE_IMAGE).Error; err != nil {
		return err
	}

	post.User = &author

	return nil
}

func GetPostFiles(db *gorm.DB, post *model.Post) error {
	var files []model.File

	if err := db.Model(post).Association("Files").Find(&files); err != nil {
		return err
	}

	post.Files = files

	return nil
}

// StorePost creates a new post
func StorePost(db *gorm.DB, post *model.Post, files []*multipart.FileHeader) error {
	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(post).Error; err != nil {
			return err
		}

		postFiles := make([]*model.File, len(files))

		for i, file := range files {
			src, err := file.Open()

			if err != nil {
				fmt.Println(err)
				return err
			}

			defer src.Close()

			content, _ := io.ReadAll(src)
			mimeType := file.Header.Get("Content-Type")

			key := fmt.Sprintf("%d/%s", post.ID, file.Filename)

			if err := storage.Put(storage.POSTS_BUCKET, key, content, mimeType); err != nil {
				return err
			}

			postFiles[i] = &model.File{
				Type:     model.FILE_TYPE_POST_ATTACHMENT,
				Key:      file.Filename,
				Bucket:   storage.POSTS_BUCKET,
				MimeType: mimeType,
			}
		}

		return tx.Model(post).Association("Files").Append(postFiles)
	})
}
