package cmd

import (
	"os"
	"path"

	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/pressly/goose/v3"
	"github.com/spf13/cobra"
)

var makeMigration = &cobra.Command{
	Use:   "make:migration",
	Short: "Create a new migration file",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		conn, _ := database.Connect()

		db, _ := conn.DB()

		dir, _ := os.Getwd()

		path := path.Join(dir, "internal/classroom/database", "migrations")

		if err := goose.Create(db, path, args[0], "sql"); err != nil {
			panic(err)
		}
	},
}

func init() {
	rootCmd.AddCommand(makeMigration)
}
