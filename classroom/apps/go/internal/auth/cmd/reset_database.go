package cmd

import (
	"context"

	"github.com/Binaretech/classroom/internal/auth/database"
	"github.com/spf13/cobra"
)

var resetDatabase = &cobra.Command{
	Use:   "database:reset",
	Short: "Reset database",
	Run: func(cmd *cobra.Command, args []string) {

		client, _ := database.Connect()
		db := database.GetDatabase(client)

		defer database.Close(client)

		db.Collection("users").Drop(context.Background())

	},
}

func init() {
	rootCmd.AddCommand(resetDatabase)
}
