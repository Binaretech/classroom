package cmd

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/server"
	"github.com/Binaretech/classroom/internal/classroom/storage"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "classroom",
	Short: "Classroom main server",
	Run: func(cmd *cobra.Command, args []string) {
		storage.OpenStorage()

		db, err := database.Connect()

		if err != nil {
			log.Fatalln(err.Error())
		}

		app := server.App(db)

		if err := app.Start(":80"); err != nil && err != http.ErrServerClosed {
			app.Logger.Fatal("shutting down the server")
		}
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
