package service

import (
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/lang"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// GetClasses returns a query to get all classes of the user.
func GetClasses(db *gorm.DB, userID string) *gorm.DB {
	ownClasses := db.Model(&model.Class{}).
		Joins("Owner").
		Joins("LEFT JOIN sections ON sections.class_id = classes.id").
		Select(`
			classes.id,
			classes.name,
			classes.archived,
			classes.description,
			classes.created_at,
			classes.updated_at,
			TRUE as is_teacher, 
			FALSE AS is_student
		`).
		Where("classes.owner_id = ?", userID)

	studentClass := db.Model(&model.Class{}).
		Joins("Owner").
		Joins("JOIN sections ON sections.class_id = classes.id").
		Joins("JOIN students ON students.section_id = sections.id").
		Select(`
			classes.id,
			CONCAT(classes.name, ' (', sections.name, ')') as name, 
			classes.archived,
			classes.description,
			classes.created_at,
			classes.updated_at,
			FALSE AS is_teacher, 
			TRUE as is_student
		`).
		Where("students.user_id = ?", userID)

	teachClass := db.Model(&model.Class{}).
		Joins("Owner").
		Joins("JOIN sections ON sections.class_id = classes.id").
		Joins("JOIN teachers ON teachers.section_id = sections.id").
		Select(`
			classes.id,
			classes.name,
			classes.archived,
			classes.description,
			classes.created_at,
			classes.updated_at,
			TRUE as is_teacher, 
			FALSE AS is_student
		`).
		Where("teachers.user_id = ?", userID)

	return db.Table("(? UNION ? UNION ?) as classes", ownClasses, studentClass, teachClass)
}

// GetClass returns a query to get a class by id.
func GetClass[T any](db *gorm.DB, userId string, id uint) (*T, error) {
	class := new(T)

	if err := GetClasses(db, userId).Where("classes.id = ?", id).First(class).Error; err != nil {
		return nil, err
	}

	return class, nil
}

// CreateClass creates a new class.
func CreateClass(db *gorm.DB, userID, name string, description *string) (uint, error) {
	class := model.Class{
		Name:        name,
		Description: description,
		OwnerID:     userID,
	}

	if err := db.Create(&class).Error; err != nil {
		return 0, err
	}

	return class.ID, nil
}

// DeleteClass deletes the class.
func DeleteClass(db *gorm.DB, userID string, id uint) error {
	return db.
		Where("owner_id = ?", userID).
		Where("id = ?", id).
		Delete(&model.Class{}).
		Error
}

// UpdateClass updates the class.
func UpdateClass(db *gorm.DB, userID string, id uint, class map[string]any) error {
	return db.
		Where("owner_id = ?", userID).
		Where("archived = true").
		Where("id = ?", id).
		Updates(class).
		Error
}

// ArchiveClass archives the class.
func ArchiveClass(c echo.Context, db *gorm.DB, userID string, id uint) error {
	var class model.Class

	if err := db.Where("owner_id = ?", userID).Where("id = ?", id).First(&class).Error; err != nil {
		return errors.NewNotFound(lang.TransCtx(c, "class not found"))
	}

	if class.Archived {
		return errors.NewBadRequest(lang.TransCtx(c, "class already archived"))
	}

	if err := db.Model(&class).Update("archived", true).Error; err != nil {
		return errors.NewInternalError(err)
	}

	return nil
}

// UnarchiveClass unarchives the class.
func UnarchiveClass(db *gorm.DB, userID string, id uint) error {
	return db.
		Model(&model.Class{}).
		Where("owner_id = ?", userID).
		Where("archived = true").
		Where("id = ?", id).
		Updates(map[string]any{
			"archived": false,
		}).
		Error
}

// ArchivedClasses returns all archived classes of the user.
func ArchivedClasses(db *gorm.DB, userID string) *gorm.DB {
	return db.Model(&model.Class{}).
		Where("owner_id = ?", userID).
		Where("archived = true")
}

// ClassSeccion returns a query to get all sections of the class.
func GetClassSections(db *gorm.DB, user string, id uint) *gorm.DB {
	return db.Model(&model.Section{}).
		Where("class_id = ?", id)
}

// IsClassOwner checks if the user is the owner of the class.
func IsClassOwner(db *gorm.DB, userID string, id uint) bool {
	return db.
		Where("owner_id = ?", userID).
		Where("id = ?", id).
		First(&model.Class{}).
		Error == nil
}

// IsClassTeacher checks if the user is a student of the class.
func IsClassStudent(db *gorm.DB, userID string, id uint) bool {
	return db.
		Joins("JOIN sections ON sections.class_id = classes.id").
		Joins("JOIN students ON students.section_id = sections.id").
		Where("students.user_id = ?", userID).
		Where("classes.id = ?", id).
		First(&model.Class{}).
		Error == nil
}

func GetClassMembers(db *gorm.DB, classId uint) *gorm.DB {
	return db.Model(&model.User{}).
		Joins("JOIN students ON students.user_id = users.id").
		Joins("JOIN sections ON students.section_id = sections.id").
		Where("sections.class_id = ?", classId)
}

func GetStudentClass[T any](db *gorm.DB, id uint) (*T, error) {
	resource := new(T)

	if err := db.Model(model.Section{}).
		Where("sections.class_id = ?", id).First(resource).Error; err != nil {
		return nil, err
	}

	return resource, nil
}
