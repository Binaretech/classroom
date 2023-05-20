package server

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"time"

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

	go func() {
		if err := app.Start(fmt.Sprintf(":%s", viper.GetString("classroom_port"))); err != nil {
			log.Fatalln(err.Error())

			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	return app.Shutdown(ctx)
}
