package service

import (
	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/lang"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/utils/auth"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func CreateSection(db *gorm.DB, name string, classID uint) (uint, error) {
	section := &model.Section{
		Name:    name,
		ClassID: classID,
	}

	if err := db.Create(section).Error; err != nil {
		return 0, err
	}

	return section.ID, nil
}

func FindSection[T any](db *gorm.DB, id uint) (*T, error) {
	resource := new(T)

	if err := db.Model(model.Section{}).
		Where("sections.id = ?", id).First(resource).Error; err != nil {
		return nil, err
	}

	return resource, nil
}

func FindSectionWithClass[T any](c echo.Context, db *gorm.DB, id uint) (*T, error) {
	resource := new(T)

	if err := db.Model(model.Section{}).
		Preload("Class", func(db *gorm.DB) *gorm.DB {
			return GetClasses(db, auth.UserID(c))
		}).
		Where("sections.id = ?", id).First(resource).Error; err != nil {
		return nil, err
	}

	return resource, nil
}

// IsValidSectionName returns true if the section name is available to the given class ID
func IsValidSectionName(db *gorm.DB, name string, classId uint) bool {
	section := db.Model(&model.Section{}).
		Where("sections.name = ?", name).
		Where("sections.class_id = ?", classId).
		First(&model.Section{})

	return section.RowsAffected == 0
}

func IsSectionMember(db *gorm.DB, userId string, sectionId uint) bool {
	section := db.Model(&model.Section{}).
		Joins("LEFT JOIN classes ON classes.id = sections.class_id").
		Joins("LEFT JOIN teachers ON teachers.section_id = sections.id").
		Joins("LEFT JOIN students ON students.section_id = sections.id").
		Where("sections.id = @section_id AND (teachers.user_id = @user_id OR students.user_id = @user_id OR classes.owner_id = @user_id)", map[string]any{
			"section_id": sectionId,
			"user_id":    userId,
		}).
		First(&model.Section{})

	return section.RowsAffected > 0
}

func IsSectionOwner(db *gorm.DB, userId string, sectionId uint) bool {
	section := db.Model(&model.Section{}).
		Joins("JOIN classes ON classes.id = sections.class_id").
		Where("sections.id = ? AND classes.owner_id = ?", sectionId, userId).
		First(&model.Section{})

	return section.RowsAffected > 0
}

func GetSectionMembers(db *gorm.DB, sectionId uint) *gorm.DB {
	teachersQuery := db.Model(&model.User{}).
		Joins("JOIN teachers ON teachers.user_id = users.id").
		Where("teachers.section_id = ?", sectionId).
		Select("users.id", "users.name", "users.lastname", "users.email", "'teacher' as type", "1 as priority")

	studentsQuery := db.Model(&model.User{}).
		Joins("JOIN students ON students.user_id = users.id").
		Where("students.section_id = ?", sectionId).
		Select("users.id", "users.name", "users.lastname", "users.email", "'student' as type", "2 as priority")

	ownerQuery := db.Model(&model.User{}).
		Joins("JOIN classes ON classes.owner_id = users.id").
		Joins("JOIN sections ON sections.class_id = classes.id").
		Where("sections.id = ?", sectionId).
		Select("users.id", "users.name", "users.lastname", "users.email", "'admin' as type", "0 as priority")

	query := db.
		Table("(? UNION ? UNION ?) as users", teachersQuery, studentsQuery, ownerQuery).
		Order("priority ASC")

	return query
}

func AddStudent(c echo.Context, db *gorm.DB, sectionId uint, email string) error {
	section := model.Section{}

	if err := db.First(&section, sectionId).Error; err != nil {
		return errors.NewNotFound(lang.TransCtx(c, "section not found"))
	}

	user := &model.User{}
	if err := db.Where("email = ?", email).First(user); err == nil {
		exitsInvite := db.Model(&model.SectionInvite{}).
			Joins("JOIN sections ON sections.id = section_invites.section_id").
			Where("section_id = ? AND email = ?", sectionId, email)

		if database.Exists(exitsInvite) {
			return errors.NewBadRequest(
				lang.TransCtx(c, "invite already sent"))
		}

		if err := db.Create(&model.SectionInvite{SectionId: sectionId, Email: email}).Error; err != nil {
			return err
		}

		return nil
	}

	studentExistsQuery := db.Model(&model.Class{}).
		Joins("JOIN sections ON sections.class_id = classes.id").
		Joins("JOIN students ON students.section_id = sections.id").
		Where("classes.id = ? AND students.user_id = ?", section.ClassID, user.ID)

	if database.Exists(studentExistsQuery) {
		return errors.NewBadRequest(
			lang.TransCtx(c, "user already in this class"))
	}

	if err := db.Model(&section).Association("Students").Append(user); err != nil {
		return errors.NewInternalError(err)
	}

	return nil
}

func RemoveStudent(c echo.Context, db *gorm.DB, sectionId uint, userId string) error {
	section := model.Section{}

	if err := db.First(&section, sectionId).Error; err != nil {
		return errors.NewNotFound(lang.TransCtx(c, "section not found"))
	}

	if err := db.Model(&section).Association("Students").Delete(&model.User{ID: userId}); err != nil {
		return errors.NewInternalError(err)
	}

	return nil

}

func BelongsToSection(db *gorm.DB, userId string, sectionId uint) bool {
	section := db.Model(&model.Section{}).
		Joins("LEFT JOIN classes ON classes.id = sections.class_id").
		Joins("LEFT JOIN teachers ON teachers.section_id = sections.id").
		Joins("LEFT JOIN students ON students.section_id = sections.id").
		Where("sections.id = @section_id AND (teachers.user_id = @user_id OR students.user_id = @user_id OR classes.owner_id = @user_id)", map[string]any{
			"section_id": sectionId,
			"user_id":    userId,
		}).
		First(&model.Section{})

	return section.RowsAffected > 0
}

func FindPost(db *gorm.DB, id uint) *model.Post {
	var post model.Post

	db.Model(&model.Post{}).
		Preload("User").
		Where("posts.id = ?", id).
		First(&post)

	return &post
}

func DeleteSection(db *gorm.DB, section *model.Section) error {
	if err := db.Delete(section).Error; err != nil {
		return err
	}

	return nil

}
