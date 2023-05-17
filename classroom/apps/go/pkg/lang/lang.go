package lang

import (
	"github.com/go-playground/locales/en"
	"github.com/go-playground/locales/es"
	ut "github.com/go-playground/universal-translator"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

var translator *ut.UniversalTranslator

func init() {
	es := es.New()
	en := en.New()

	translator = ut.New(es, en)

	setUpEs()
	setUpEn()
}

// Translator returns the instance of translator for a given locale.
// If the given locale doesn't exist, a fallback locale will be used
func Translator(locale string) ut.Translator {
	trans, _ := translator.GetTranslator(locale)
	return trans
}

// Trans returns a translated message for a given locale.
// If the locale doesn't exist, a fallback locale will be used
func Trans(msg string, params ...string) string {
	trans, _ := translator.GetTranslator(viper.GetString("lang"))
	message, err := trans.T(msg, params...)

	if err != nil {
		return msg
	}

	return message
}

// TransCtx returns a translated message for a given locale.
// If the locale doesn't exist, a fallback locale will be used
func TransCtx(ctx echo.Context, msg string, params ...string) string {
	var lang string
	if locale, ok := ctx.Get("lang").(string); ok {
		lang = locale
	} else {
		lang = viper.GetString("lang")
	}

	trans, _ := translator.GetTranslator(lang)
	message, err := trans.T(msg, params...)

	if err != nil {
		return msg
	}

	return message
}
