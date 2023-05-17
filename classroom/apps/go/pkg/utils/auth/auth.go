package auth

import (
	"github.com/labstack/echo/v4"
)

func UserID(c echo.Context) string {
	return c.Request().Header.Get("X-Auth-User")
}

func UserEmail(c echo.Context) string {
	return c.Request().Header.Get("X-Auth-User-Email")
}
