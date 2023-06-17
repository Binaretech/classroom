package seeder

import (
	"math/rand"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/brianvoe/gofakeit/v6"
	"gorm.io/gorm"
)

func classSeeder(db *gorm.DB) {
	classes := []model.Class{}

	teacher := model.User{}
	student := model.User{}

	db.First(&teacher, "id = ?", "61a406ea18f8a0bdf663e144")
	db.First(&student, "id = ?", "71a406ea18f8a0bdf663e144")

	for i := 0; i < 50; i++ {
		sections := []model.Section{}

		for i := 0; i < rand.Intn(2)+1; i++ {
			sections = append(sections, model.Section{
				Name: gofakeit.Name(),
			})
		}

		usersID := []string{}
		db.Model(&model.User{}).Pluck("id", &usersID)

		classes = append(classes, model.Class{
			Name:     gofakeit.HipsterSentence(2),
			OwnerID:  teacher.ID,
			Sections: sections,
		})
	}

	db.Create(&classes)

	for _, class := range classes {
		users := []model.User{}

		db.Where("id not in (?)", []string{"71a406ea18f8a0bdf663e144", "61a406ea18f8a0bdf663e144"}).Limit(rand.Intn(10) + 1).Find(&users)

		section := model.Section{
			Name:     gofakeit.Name(),
			Students: append(users, student),
			ClassID:  class.ID,
		}

		db.Create(&section)
	}
}
