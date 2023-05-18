package service

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/storage"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/utils"
	"gorm.io/gorm"
)

func GetUser(db *gorm.DB, ID string) (*model.User, error) {
	var user model.User

	if err := db.First(&user, "id = ?", ID).Error; err != nil {
		return nil, err
	}

	db.First(&user.ProfileImage, "fileable_type = ? AND fileable_id = ? AND type = ?", model.FILEABLE_TYPE_USERS, user.ID, model.FILE_TYPE_PROFILE_IMAGE)

	return &user, nil
}

func StoreUser(db *gorm.DB, user *model.User, image *multipart.FileHeader) error {
	if err := db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&user).Error; err != nil {
			return err
		}

		if err := StoreProfileImage(user, tx, image, user.ID); err != nil {
			return err
		}

		return nil

	}); err != nil {
		return errors.NewInternalError(err)
	}

	return nil
}

func StoreProfileImage(user *model.User, db *gorm.DB, file *multipart.FileHeader, ID string) error {
	if file == nil {
		return nil
	}

	buffer, _ := file.Open()
	defer buffer.Close()

	bytes := bytes.NewBuffer(nil)
	io.Copy(bytes, buffer)

	mimeType := file.Header.Get("Content-Type")

	extension := utils.ExtensionByMime(mimeType)

	key := fmt.Sprintf("%s/profile-image%s", ID, extension)
	if err := storage.Put(storage.USERS_BUCKET, key, bytes.Bytes(), mimeType); err != nil {
		return err
	}

	profileImage := model.File{
		Key:      key,
		MimeType: mimeType,
		Bucket:   storage.USERS_BUCKET,
	}

	if err := db.Model(&model.User{ID: user.ID}).Association("Files").Replace(&profileImage); err != nil {
		return err
	}

	user.ProfileImage = &profileImage

	return nil

}

func SearchUsersByEmail(userId string, db *gorm.DB, email string) []model.User {
	var users []model.User

	db.Limit(3).
		Where("LOWER(email) LIKE LOWER(CONCAT('%', ?::text,'%'))", email).
		Where("id <> ?", userId).
		Find(&users)

	return users
}
