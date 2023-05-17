package server

import (
	"github.com/Binaretech/classroom/internal/auth/handler"
	"github.com/Binaretech/classroom/internal/auth/validation"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo"
)

// App holds the server and the routes to be used by the server to handle requests from the client side of the application
func App(db *mongo.Database) *echo.Echo {
	app := echo.New()

	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost", "http://docs.main.localhost"},
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
		AllowCredentials: true,
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	app.Use(middleware.Recover())

	app.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			locale := c.Request().Header.Get("Locale")

			c.Set("lang", locale)
			return next(c)
		}
	})

	app.Validator = validation.SetUpValidator(db)

	app.HTTPErrorHandler = errors.Handler

	auth := app.Group("/auth")

	handler := handler.New(db)

	handler.Routes(auth)

	return app
}
