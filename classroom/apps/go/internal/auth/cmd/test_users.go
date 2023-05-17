//go:build !production

package cmd

import (
	"context"
	"fmt"

	"github.com/Binaretech/classroom/internal/auth/database"
	"github.com/Binaretech/classroom/internal/auth/database/schema"
	"github.com/Binaretech/classroom/pkg/hash"
	"github.com/spf13/cobra"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var testUsers = &cobra.Command{
	Use:   "create:users",
	Short: "Insert users in database",
	Run: func(cmd *cobra.Command, args []string) {

		client, _ := database.Connect()
		db := database.GetDatabase(client)

		defer database.Close(client)

		id, _ := primitive.ObjectIDFromHex("61a406ea18f8a0bdf663e144")
		id2, _ := primitive.ObjectIDFromHex("71a406ea18f8a0bdf663e144")

		users := []any{
			schema.User{
				ID:       id,
				Email:    "test@classroom.com",
				Password: hash.Bcrypt("secret"),
			},
			schema.User{
				ID:       id2,
				Email:    "test1@classroom.com",
				Password: hash.Bcrypt("secret"),
			},
		}

		for i := 2; i < 10; i++ {
			users = append(users, schema.User{
				ID:       primitive.NewObjectID(),
				Email:    fmt.Sprintf("test%d@classroom.com", i),
				Password: hash.Bcrypt("secret"),
			})
		}

		collection := database.Users(db)
		_, err := collection.InsertMany(context.Background(), users)

		if err != nil {
			panic(err)
		}

	},
}

func init() {
	rootCmd.AddCommand(testUsers)
}
