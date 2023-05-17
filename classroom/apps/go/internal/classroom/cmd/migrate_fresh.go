//go:build !production

// go:build !docs

package cmd

import (
	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/database/seeder"

	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var migrateFreshCmd = &cobra.Command{
	Use:   "migrate:fresh",
	Short: "Recreate the entire database",
	Run: func(cmd *cobra.Command, args []string) {
		conn, _ := database.Connect()

		if err := database.Drop(conn); err != nil {
			logrus.Error(err.Error())
			return
		}

		database.Migrate(conn)

		if viper.GetBool("seed") {
			seeder.Run()
		}
	},
}

func init() {
	migrateFreshCmd.PersistentFlags().BoolP("seed", "s", false, "run seeder after migrate")
	viper.BindPFlag("seed", migrateFreshCmd.PersistentFlags().Lookup("seed"))
	rootCmd.AddCommand(migrateFreshCmd)
}
