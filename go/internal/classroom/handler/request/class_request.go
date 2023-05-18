package request

import (
	"strconv"

	"github.com/Binaretech/classroom/internal/classroom/handler/resource"
	"github.com/labstack/echo/v4"
)

type CreateClassRequest struct {
	Request
	Name        string  `json:"name" validate:"required,max=64"`
	Description *string `json:"description" validate:"omitempty,max=255"`
}

func NewCreateClassRequest(c echo.Context) *CreateClassRequest {
	req := &CreateClassRequest{}

	c.Bind(req)

	return req
}

type DeleteClassRequest struct {
	Request
	ClassId uint `json:"classId" validate:"required,exists=classes;id"`
}

func NewDeleteClassRequest(c echo.Context) *DeleteClassRequest {
	req := &DeleteClassRequest{}

	c.Bind(req)

	classId, _ := strconv.Atoi(c.Param("id"))

	req.ClassId = uint(classId)

	return req
}

type UpdateClassRequest struct {
	Request
	ID   uint           `swaggerignore:"true"`
	Data map[string]any `swaggerignore:"true"`
}

type UpdateClassData struct {
	Name        *string `json:"name" validate:"required,max=64"`
	Description *string `json:"description" validate:"omitempty,max=255"`
}

func NewUpdateClassRequest(c echo.Context) *UpdateClassRequest {
	req := new(UpdateClassRequest)

	c.Bind(req.Data)

	id, _ := strconv.Atoi(c.Param("id"))
	req.ID = uint(id)

	return req
}

func (req *UpdateClassRequest) DataStruct() *UpdateClassData {
	data := new(UpdateClassData)

	if name, ok := req.Data["name"]; ok {
		data.Name = name.(*string)
	}

	if description, ok := req.Data["description"]; ok {
		data.Description = description.(*string)
	}

	return data
}

type ClassMembersRequest struct {
	PaginationRequest[resource.UserResource]
	ID uint `validate:"required,exists=classes;id"`
}

func NewClassMembersRequest(c echo.Context) *ClassMembersRequest {
	req := &ClassMembersRequest{}

	req.PaginationRequest = NewPaginatedRequest[resource.UserResource](c)

	id, _ := strconv.Atoi(c.Param("id"))

	req.ID = uint(id)

	c.Bind(req)

	return req
}

type ShowClassRequest struct {
	ShowResourceRequest[resource.ClassResource]
	Id uint `validate:"required,exists=classes;id"`
}

func NewShowClassRequest(c echo.Context) *ShowClassRequest {
	req := &ShowClassRequest{}

	req.ShowResourceRequest = NewShowResourceRequest[resource.ClassResource](c)

	id, _ := strconv.Atoi(c.Param("id"))

	req.Id = uint(id)

	return req
}

type StudentClassRequest struct {
	ShowResourceRequest[resource.SectionResource]
	Id uint `validate:"required,exists=classes;id"`
}

func NewStudentClassRequest(c echo.Context) *StudentClassRequest {
	req := &StudentClassRequest{}

	req.ShowResourceRequest = NewShowResourceRequest[resource.SectionResource](c)

	id, _ := strconv.Atoi(c.Param("id"))

	req.Id = uint(id)

	return req
}
