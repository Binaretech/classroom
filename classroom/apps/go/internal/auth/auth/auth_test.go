package auth_test

import (
	"testing"

	"github.com/Binaretech/classroom/config"
	"github.com/Binaretech/classroom/internal/auth/auth"
	"github.com/Binaretech/classroom/internal/auth/cache"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/stretchr/testify/assert"
)

func TestAuth(t *testing.T) {
	config.Initialize()
	cache.Initialize()

	id := gofakeit.DigitN(3)
	email := gofakeit.Email()

	token, err := auth.Authenticate(id, email)

	assert.Empty(t, err)

	_, status := auth.VerifyToken(token.AccessToken)
	assert.True(t, status)
}
