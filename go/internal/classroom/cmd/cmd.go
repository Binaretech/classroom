package cmd

import (
	"fmt"
	"os"

	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/server"
	"github.com/Binaretech/classroom/internal/classroom/storage"
	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "classroom",
	Short: "Classroom main server",
	Run: func(cmd *cobra.Command, args []string) {
		storage.OpenStorage()

		if db, err := database.Connect(); err != nil {
			logrus.Fatal(err)
		} else {
			logrus.Fatalln(server.Listen(db))
		}
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
