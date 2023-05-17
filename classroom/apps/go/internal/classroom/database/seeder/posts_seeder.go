package seeder

import (
	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/brianvoe/gofakeit/v6"
	"gorm.io/gorm"
)

func postSeeder(db *gorm.DB) {
	classIds := []uint{}
	db.Model(&model.Section{}).Pluck("id", &classIds)

	post := []model.Post{}

	studentsQuery := db.Model(&model.User{}).
		Joins("JOIN students ON students.user_id = users.id").
		Select("users.id")

	teachersQuery := db.Model(&model.User{}).
		Joins("JOIN students ON students.user_id = users.id").
		Select("users.id")

	for _, id := range classIds {
		usersIds := []string{}
		db.Table("(? UNION ?) as users", studentsQuery, teachersQuery).
			Pluck("id", &usersIds)

		for i := 0; i < 10; i++ {
			post = append(post, model.Post{
				SectionID: id,
				Type:      model.POST_TYPE_USER_POST,
				Content:   "hello world",
				UserID:    gofakeit.RandomString(usersIds),
			})
		}
	}

	db.CreateInBatches(&post, 10)
}
