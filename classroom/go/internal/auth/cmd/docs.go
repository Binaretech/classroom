package cmd

import (
	"fmt"
	"log"
	"os/exec"

	"github.com/Binaretech/classroom/config"
	_ "github.com/Binaretech/classroom/internal/auth/docs"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	echoSwagger "github.com/swaggo/echo-swagger"
)

var docsServeCmd = &cobra.Command{
	Use:   "docs:serve",
	Short: "Serve the documentation",
	Run: func(cmd *cobra.Command, args []string) {
		config.Initialize()

		app := echo.New()

		app.Use(middleware.Logger())

		app.GET("/docs/auth", func(c echo.Context) error {
			return c.Redirect(301, "/docs/auth/index.html")
		})
		app.GET("/docs/auth/*", echoSwagger.WrapHandler)

		port := viper.GetInt("AUTH_DOCS_PORT")

		log.Fatal(app.Start(fmt.Sprintf(":%d", port)))

	},
}

var docsGenerateCmd = &cobra.Command{
	Use:   "docs:generate",
	Short: "Generate the documentation",
	Run: func(cmd *cobra.Command, args []string) {
		if _, err := exec.LookPath("swag"); err != nil {
			exec.Command("go", "install", "github.com/swaggo/swag/cmd/swag@latest").Run()
		}

		if err := exec.Command("swag", "init", "--parseInternal", "-g", "./cmd/auth/main.go", "-o", "./internal/auth/docs").Run(); err != nil {
			log.Fatal(err)
		}
	},
}

func init() {
	rootCmd.AddCommand(docsServeCmd)
	rootCmd.AddCommand(docsGenerateCmd)
}
