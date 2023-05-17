//go:build !production

// go:build !docs

package cmd

import (
	"github.com/Binaretech/classroom/internal/classroom/database"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Run gorm migrations",
	Run: func(cmd *cobra.Command, args []string) {
		conn, _ := database.Connect()

		database.Migrate(conn)
	},
}

func init() {
	migrateCmd.PersistentFlags().BoolP("seed", "s", false, "run seeder after migrate")
	viper.BindPFlag("seed", migrateCmd.PersistentFlags().Lookup("seed"))
	rootCmd.AddCommand(migrateCmd)
}
