package server

import (
	"fmt"

	"github.com/Binaretech/classroom/internal/classroom/handler"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/validation"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

func Listen(db *gorm.DB) error {
	app := echo.New()

	app.Use(middleware.CORS())

	app.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `Method: ${method}, URI: ${uri}, Status: ${status}, Error: ${error}, Latency: ${latency_human}`,
	}))

	app.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			locale := c.Request().Header.Get("Locale")

			c.Set("lang", locale)
			return next(c)
		}
	})

	app.HTTPErrorHandler = errors.Handler

	app.Validator = validation.SetUpValidator(db)

	api := app.Group("/api")

	handler := handler.New(db)
	handler.Routes(api)

	return app.Start(fmt.Sprintf(":%s", viper.GetString("port")))
}
