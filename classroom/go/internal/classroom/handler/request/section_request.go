package request

import (
	"strconv"

	"github.com/Binaretech/classroom/internal/classroom/handler/resource"
	"github.com/labstack/echo/v4"
)

type SectionRequest[T any] struct {
	PaginationRequest[T]
	ID uint `validate:"required,exists=sections"`
}

type ShowSectionRequest struct {
	ShowResourceRequest[resource.SectionResource]
	ID uint `validate:"required"`
}

func NewShowSectionRequest(c echo.Context) *ShowSectionRequest {
	id, _ := strconv.Atoi(c.Param("id"))

	return &ShowSectionRequest{
		ShowResourceRequest: NewShowResourceRequest[resource.SectionResource](c),
		ID:                  uint(id),
	}

}

// NewSectionRequest creates a new SectionRequest
func NewSectionRequest[T any](c echo.Context) SectionRequest[T] {
	id, _ := strconv.Atoi(c.Param("id"))

	return SectionRequest[T]{
		PaginationRequest: NewPaginatedRequest[T](c),
		ID:                uint(id),
	}
}

type AddMemberRequest struct {
	Email     string `validate:"required,email" json:"email"`
	SectionID uint   `validate:"required,exists=sections;id" json:"sectionId"`
}

func NewAddMemberRequest(c echo.Context) AddMemberRequest {
	request := AddMemberRequest{}
	id, _ := strconv.Atoi(c.Param("id"))

	c.Bind(&request)

	request.SectionID = uint(id)

	return request
}

type RemoveMemberRequest struct {
	UserID    string `validate:"required,exists=users;id" json:"userId"`
	SectionID uint   `validate:"required,exists=sections;id" json:"sectionId"`
}

func NewRemoveMemberRequest(c echo.Context) *RemoveMemberRequest {
	id, _ := strconv.Atoi(c.Param("id"))
	userId := c.Param("userId")

	return &RemoveMemberRequest{
		UserID:    userId,
		SectionID: uint(id),
	}
}

type CreateSectionRequest struct {
	Request
	Name    string `json:"name" validate:"required,max=64"`
	ClassID uint   `json:"classId" validate:"required,exists=classes;id"`
}

func NewCreateSectionRequest(c echo.Context) *CreateSectionRequest {
	req := &CreateSectionRequest{}

	c.Bind(req)

	return req
}

type DeleteSectionRequest struct {
	Request
	ID uint `validate:"required,exists=sections;id"`
}

func NewDeleteSectionRequest(c echo.Context) *DeleteSectionRequest {
	id, _ := strconv.Atoi(c.Param("id"))

	req := &DeleteSectionRequest{
		ID: uint(id),
	}

	return req
}
