package handler

import (
	"net/http"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/internal/classroom/handler/request"
	"github.com/Binaretech/classroom/internal/classroom/handler/resource"
	"github.com/Binaretech/classroom/internal/classroom/handler/service"
	"github.com/Binaretech/classroom/internal/classroom/lang"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/Binaretech/classroom/pkg/utils/auth"
	"github.com/labstack/echo/v4"
)

// CreateSection creates a new section
// @Summary Create a new section
// @Description Create a new section
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param section body request.CreateSectionRequest true "Section"
// @Success 201 {object} resource.MessageWithDataResource{data=resource.SectionResource}
// @Failure 401 {object} errors.Forbidden
// @Failure 500 {object} errors.InternalError
// @Router /sections [post]
func (h *Handler) CreateSection(c echo.Context) error {
	req := request.NewCreateSectionRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	if !service.IsClassOwner(h.DB, auth.UserID(c), req.ClassID) {
		return errors.NewForbidden(lang.TransCtx(c, "not class owner"))
	}

	if !service.IsValidSectionName(h.DB, req.Name, req.ClassID) {
		return errors.NewBadRequest(lang.TransCtx(c, "section name already exists"))
	}

	id, err := service.CreateSection(h.DB, req.Name, req.ClassID)

	if err != nil {
		return err
	}

	resource, err := service.FindSection[resource.SectionResource](h.DB, id)

	if err != nil {
		return err
	}

	return req.SendMessageWithData(c, http.StatusCreated, lang.TransCtx(c, "section created"), resource)
}

// ShowSection returns a section
// @Summary Get a section
// @Description Get a section
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param id path string true "Section ID"
// @Success 200 {object} resource.SectionResource
// @Failure 400 {object} errors.BadRequest
func (h *Handler) ShowSection(c echo.Context) error {
	req := request.NewShowSectionRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	if !service.IsSectionMember(h.DB, auth.UserID(c), req.ID) {
		return errors.NewBadRequest(lang.TransCtx(c, "not section member"))
	}

	resource, err := service.FindSectionWithClass[resource.SectionResource](c, h.DB, req.ID)

	if err != nil {
		return err
	}

	return req.SendResource(c, resource)
}

// SectionMembers returns the users that belong to a section
// @Summary Get section members
// @Description Get section members
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param id path string true "Section ID"
// @Param page query int false "Page number"
// @Param per_page query int false "Items per page"
// @Success 200 {object} resource.PaginatedResource{data=resource.UserResource}
// @Failure 401 {object} errors.Forbidden
// @Router /sections/{id}/members [get]
func (h *Handler) SectionMembers(c echo.Context) error {
	req := request.NewSectionRequest[resource.UserResource](c)

	if err := c.Validate(&req); err != nil {
		return err
	}

	if !service.IsSectionMember(h.DB, auth.UserID(c), req.ID) {
		return errors.NewForbidden(lang.TransCtx(c, "not section member"))
	}

	query := service.GetSectionMembers(h.DB, req.ID)

	return req.SendPaginatedResource(c, query)
}

// AddMember adds a user to a section
// @Summary Add a user to a section
// @Description Add a user to a section
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param id path string true "Section ID"
// @Param user body request.AddMemberRequest true "User ID"
// @Success 200 {object} resource.MessageResource
// @Failure 401 {object} errors.Forbidden
// @Failure 500 {object} errors.InternalError
// @Failure 404 {object} errors.NotFound
// @Router /sections/{id}/students [post]
func (h *Handler) AddMember(c echo.Context) error {
	req := request.NewAddMemberRequest(c)

	if err := c.Validate(&req); err != nil {
		return err
	}

	if !service.IsSectionOwner(h.DB, auth.UserID(c), req.SectionID) {
		return errors.NewForbidden(lang.TransCtx(c, "not section owner"))
	}

	err := service.AddStudent(c, h.DB, req.SectionID, req.Email)

	if err != nil {
		return err
	}

	return request.SendMessage(c, lang.TransCtx(c, "User added to section"))
}

// RemoveMember removes a user from a section
// @Summary Remove a user from a section
// @Description Remove a user from a section
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param id path string true "Section ID"
// @Param user body request.RemoveMemberRequest true "User ID"
// @Success 200 {object} resource.MessageResource
// @Failure 401 {object} errors.Forbidden
// @Failure 500 {object} errors.InternalError
// @Failure 404 {object} errors.NotFound
// @Router /sections/{id}/students [delete]
func (h *Handler) RemoveMember(c echo.Context) error {
	req := request.NewRemoveMemberRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	if !service.IsSectionOwner(h.DB, auth.UserID(c), req.SectionID) {
		return errors.NewForbidden(lang.TransCtx(c, "not section owner"))
	}

	if !service.IsSectionMember(h.DB, req.UserID, req.SectionID) {
		return errors.NewBadRequest(lang.TransCtx(c, "user not in section"))
	}

	err := service.RemoveStudent(c, h.DB, req.SectionID, req.UserID)

	if err != nil {
		return err
	}

	return request.SendMessage(c, lang.TransCtx(c, "User removed from section"))
}

// SectionPosts returns the posts created for a section
// @Summary Get section posts
// @Description Get section posts
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param id path string true "Section ID"
// @Param page query int false "Page number"
// @Param per_page query int false "Items per page"
// @Success 200 {object} model.Post
// @Router /sections/{id}/posts [get]
func (h *Handler) SectionPosts(c echo.Context) error {
	id := c.Param("id")
	userId := auth.UserID(c)

	req := request.NewSectionPostRequest(c, id)

	if err := c.Validate(&req); err != nil {
		return err
	}

	query := service.GetSectionPosts(h.DB, userId, id)

	return req.SendPaginatedResource(c, query)
}

// DeleteSection deletes a section
// @Summary Delete a section
// @Description Delete a section
// @Tags Sections
// @Accept  json
// @Produce  json
// @Param id path string true "Section ID"
// @Success 200 {object} resource.MessageResource
// @Failure 401 {object} errors.Forbidden
// @Failure 500 {object} errors.InternalError
// @Failure 404 {object} errors.NotFound
// @Router /sections/{id} [delete]
func (h *Handler) DeleteSection(c echo.Context) error {
	req := request.NewDeleteSectionRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	section, _ := service.FindSection[model.Section](h.DB, req.ID)

	if !service.IsSectionOwner(h.DB, auth.UserID(c), section.ID) {
		return errors.NewForbidden(lang.TransCtx(c, "not section owner"))
	}

	if err := service.DeleteSection(h.DB, section); err != nil {
		return err
	}

	return req.SendMessage(c, lang.TransCtx(c, "section deleted"))

}
