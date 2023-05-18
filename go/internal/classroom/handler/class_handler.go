package handler

import (
	"net/http"
	"strconv"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/handler/request"
	"github.com/Binaretech/classroom/internal/classroom/handler/resource"
	"github.com/Binaretech/classroom/internal/classroom/handler/service"
	"github.com/Binaretech/classroom/internal/classroom/lang"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/utils/auth"
	"github.com/labstack/echo/v4"
)

// UserClasses returns the classes of the authenticated user
// @Summary Get user classes
// @Description Get user classes
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param page query int false "Page number" default(1)
// @Param per_page query int false "Items per page" default(10)
// @Success 200 {object} resource.PaginatedResource{data=resource.ClassResource}
// @Router /classes [get]
func (h *Handler) UserClasses(c echo.Context) error {
	userID := auth.UserID(c)

	req := request.NewPaginatedRequest[resource.ClassResource](c)

	query := service.GetClasses(h.DB, userID).Where("classes.archived = ?", false)

	return req.SendPaginatedResource(c, query)
}

// StudentClass returns the section of the student with the given class id
// @Summary Get student class
// @Description Get student class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Success 200 {object} resource.SectionResource
// @Failure 404 {object} errors.NotFound
// @Router /classes/{id}/student [get]
func (h *Handler) StudentClass(c echo.Context) error {
	req := request.NewStudentClassRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	if !service.IsClassStudent(h.DB, auth.UserID(c), uint(req.Id)) {
		return errors.NewBadRequest(lang.TransCtx(c, "not class student"))
	}

	resource, err := service.GetStudentClass[resource.SectionResource](h.DB, req.Id)

	if err != nil {
		return err
	}

	return req.SendResource(c, resource)

}

// ShowClass returns the class with the given id
// @Summary Get class
// @Description Get class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Success 200 {object} resource.ClassResource
// @Failure 404 {object} errors.NotFound{message=string}
// @Router /classes/{id} [get]
func (h *Handler) ShowClass(c echo.Context) error {
	req := request.NewShowClassRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	userID := auth.UserID(c)

	class, err := service.GetClass[resource.ClassResource](h.DB, userID, uint(req.Id))

	if err != nil {
		return err
	}

	return req.SendResource(c, class)
}

// GetClassSections returns the sections of a class
// @Summary Get class sections
// @Description Get class sections
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Param page query int false "Page number" default(1)
// @Param per_page query int false "Items per page" default(10)
// @Success 200 {object} resource.PaginatedResource{data=resource.SectionResource}
// @Failure 404 {object} errors.NotFound{message=string}
// @Router /classes/{id}/sections [get]
func (h *Handler) GetClassSections(c echo.Context) error {
	userID := auth.UserID(c)

	req := request.NewPaginatedRequest[resource.SectionResource](c)
	id, _ := strconv.Atoi(c.Param("id"))

	if !service.IsClassOwner(h.DB, userID, uint(id)) {
		return errors.NewNotFound(lang.TransCtx(c, "class not found"))
	}

	query := service.GetClassSections(h.DB, userID, uint(id))

	return req.SendPaginatedResource(c, query)
}

// CreateClass creates a new class assign the authenticated user as the owner
// @Summary Create a new class
// @Description Create a new class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param class body request.CreateClassRequest true "Class data"
// @Success 201 {object} resource.MessageWithDataResource{data=resource.ClassResource}
// @Router /classes [post]
func (h *Handler) CreateClass(c echo.Context) error {
	userID := auth.UserID(c)

	req := request.NewCreateClassRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	id, err := service.CreateClass(h.DB, userID, req.Name, req.Description)

	if err != nil {
		return err
	}

	class, err := service.GetClass[resource.ClassResource](h.DB, userID, id)

	if err != nil {
		return err
	}

	return req.SendMessageWithData(c, http.StatusCreated, lang.TransCtx(c, "created class"), class)
}

// ArchiveClass archives a class
// @Summary Archive a class
// @Description Archive a class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Success 200 {object} resource.MessageResource
// @Failure 404 {object} errors.NotFound{message=string}
// @Router /classes/{id}/archive [put]
func (h *Handler) ArchiveClass(c echo.Context) error {
	userID := auth.UserID(c)

	id, _ := strconv.Atoi(c.Param("id"))

	if !service.IsClassOwner(h.DB, userID, uint(id)) {
		return errors.NewNotFound(lang.TransCtx(c, "class not found"))
	}

	if err := service.ArchiveClass(c, h.DB, userID, uint(id)); err != nil {
		return err
	}

	return request.SendMessage(c, lang.TransCtx(c, "archived class"))
}

// UnarchiveClass unarchives a class
// @Summary Unarchive a class
// @Description Unarchive a class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Success 200 {object} resource.MessageResource
// @Failure 404 {object} errors.NotFound{message=string}
// @Router /classes/{id}/unarchive [put]
func (h *Handler) UnarchiveClass(c echo.Context) error {
	userID := auth.UserID(c)

	id, _ := strconv.Atoi(c.Param("id"))

	if !service.IsClassOwner(h.DB, userID, uint(id)) {
		return errors.NewNotFound(lang.TransCtx(c, "class not found"))
	}

	if err := service.UnarchiveClass(h.DB, userID, uint(id)); err != nil {
		return err
	}

	return request.SendMessage(c, lang.TransCtx(c, "unarchived class"))

}

// UpdateClass updates a class
// @Summary Update a class
// @Description Update a class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Param class body request.UpdateClassRequest{name=string,description=string} true "Class data"
// @Success 200 {object} resource.MessageWithDataResource{data=resource.ClassResource}
// @Failure 404 {object} errors.NotFound{message=string}
// @Router /classes/{id} [put]
func (h *Handler) UpdateClass(c echo.Context) error {
	userID := auth.UserID(c)

	req := request.NewUpdateClassRequest(c)

	if err := c.Validate(req.DataStruct()); err != nil {
		return err
	}

	if err := service.UpdateClass(h.DB, userID, req.ID, req.Data); err != nil {
		return err
	}

	class, err := service.GetClass[resource.ClassResource](h.DB, userID, req.ID)

	if err != nil {
		return err
	}

	return req.SendMessageWithData(c, http.StatusOK, lang.TransCtx(c, "updated class"), class)
}

// DeleteClass deletes a class
// @Summary Delete a class
// @Description Delete a class
// @Tags Classes
// @Accept  json
// @Produce  json
// @Param id path string true "Class ID"
// @Success 200 {object} resource.MessageResource
// @Failure 404 {object} errors.NotFound{message=string}
// @Router /classes/{id} [delete]
func (h *Handler) DeleteClass(c echo.Context) error {
	userID := auth.UserID(c)

	request := request.NewDeleteClassRequest(c)

	if err := c.Validate(request); err != nil {
		return err
	}

	class, _ := service.GetClass[model.Class](h.DB, userID, uint(request.ClassId))

	if class == nil {
		return errors.NewNotFound(lang.TransCtx(c, "class not found"))
	}

	if !class.Archived {
		return errors.NewBadRequest(lang.TransCtx(c, "class not archived"))
	}

	if err := service.DeleteClass(h.DB, userID, uint(request.ClassId)); err != nil {
		return err
	}

	return request.SendMessage(c, lang.TransCtx(c, "deleted class"))
}

// ClassMembers returns class users
// @Summary Class members
// @Description Class members
func (h *Handler) ClassMembers(c echo.Context) error {
	req := request.NewClassMembersRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	userId := auth.UserID(c)

	if !service.IsClassOwner(h.DB, userId, req.ID) {
		return errors.NewNotFound(lang.TransCtx(c, "class not found"))
	}

	return req.SendPaginatedResource(c, service.GetClassMembers(h.DB, req.ID))
}
