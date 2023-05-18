package handler

// LoginRequest is the request body for login endpoint
type LoginRequest struct {
	Email    string `json:"email" form:"email" validate:"required,exists=users"`
	Password string `json:"password" form:"password" validate:"required"`
}

// RegisterRequest is the request body for register endpoint
type RegisterRequest struct {
	Email    string `json:"email" form:"email" validate:"required,email,unique=users"`
	Password string `json:"password" form:"password" validate:"required,min=6"`
}

type googleAuthRequest struct {
	IdToken string `json:"idToken" form:"idToken" validate:"required"`
}
