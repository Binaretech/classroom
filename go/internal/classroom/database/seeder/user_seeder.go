package seeder

import (
	"fmt"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/brianvoe/gofakeit/v6"
	"gorm.io/gorm"
)

func userSeeder(db *gorm.DB) {
	users := make([]model.User, 10)

	users[0] = model.User{
		ID:       "61a406ea18f8a0bdf663e144",
		Email:    "test@classroom.com",
		Name:     gofakeit.Name(),
		Lastname: gofakeit.LastName(),
	}
	users[1] = model.User{
		ID:       "71a406ea18f8a0bdf663e144",
		Email:    "test1@classroom.com",
		Lastname: gofakeit.LastName(),
		Name:     gofakeit.Name(),
	}

	for i := 2; i < 10; i++ {
		users[i] = model.User{
			ID:       gofakeit.UUID(),
			Email:    fmt.Sprintf("test%d@classroom.com", i),
			Name:     gofakeit.Name(),
			Lastname: gofakeit.LastName(),
		}
	}

	db.Create(&users)
}
