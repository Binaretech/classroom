package cmd

import (
	"log"
	"os/exec"

	_ "github.com/Binaretech/classroom/internal/auth/docs"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/cobra"
	echoSwagger "github.com/swaggo/echo-swagger"
)

var docsServeCmd = &cobra.Command{
	Use:   "docs:serve",
	Short: "Serve the documentation",
	Run: func(cmd *cobra.Command, args []string) {
		app := echo.New()

		app.Use(middleware.Logger())

		app.GET("/docs/main", func(c echo.Context) error {
			return c.Redirect(301, "/docs/main/index.html")
		})
		app.GET("/docs/main/*", echoSwagger.WrapHandler)

		log.Fatal(app.Start(":80"))

	},
}

var docsGenerateCmd = &cobra.Command{
	Use:   "docs:generate",
	Short: "Generate the documentation",
	Run: func(cmd *cobra.Command, args []string) {
		if _, err := exec.LookPath("swag"); err != nil {
			exec.Command("go", "install", "github.com/swaggo/swag/cmd/swag@latest").Run()
		}

		if err := exec.Command("swag", "init", "--parseInternal", "-g", "./cmd/classroom/main.go", "-o", "../docs/static/swagger/classroom", "--ot", "json", "--exclude", "./internal/auth/").Run(); err != nil {
			log.Fatal(err)
		}
	},
}

func init() {
	rootCmd.AddCommand(docsServeCmd)
	rootCmd.AddCommand(docsGenerateCmd)
}
