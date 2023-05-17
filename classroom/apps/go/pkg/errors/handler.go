package errors

import (
	"encoding/json"
	"net/http"

	"github.com/Binaretech/classroom/pkg/lang"
	"github.com/getsentry/sentry-go"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

// Handler catch all the errors and returns a propper response based on the error type
func Handler(err error, c echo.Context) {
	if e, ok := err.(*json.UnmarshalTypeError); ok {
		response(c, NewBadRequestWrapped(lang.TransCtx(c, "invalid data type"), e))
		return
	}

	if e, ok := err.(ServerError); ok {
		response(c, e)
		return
	}

	sentry.CaptureException(err)

	response(c, WrapError(err, lang.TransCtx(c, "internal error"), http.StatusInternalServerError))
}

func response(c echo.Context, err ServerError) error {
	message := echo.Map{
		"error": err.GetMessage(),
	}

	if viper.GetBool("debug") {
		message["debug"] = err.Error()
	}

	return c.JSON(int(err.GetCode()), message)
}
