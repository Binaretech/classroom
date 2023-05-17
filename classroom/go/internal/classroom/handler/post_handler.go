package handler

import (
	"net/http"

	"github.com/Binaretech/classroom/internal/classroom/handler/request"
	"github.com/Binaretech/classroom/internal/classroom/handler/service"
	"github.com/Binaretech/classroom/internal/classroom/lang"
	"github.com/Binaretech/classroom/pkg/errors"
	"github.com/labstack/echo/v4"
)

// StoreSectionPost is the handler to store a post in the database
// @Summary Store a post
// @Description Store a post in the database
// @Tags Posts
// @Produce  json
// @Param post body request.StorePostRequest true "Post"
// @Success 201 {object} model.Post
// @Router /sections/:id/posts [post]
func (h *Handler) StoreSectionPost(c echo.Context) error {
	req := request.NewStorePostRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	if !service.BelongsToSection(h.DB, req.UserID, req.Section) {
		return errors.NewDefaultForbiddenCtx(c)
	}

	post := req.Post()

	if err := service.StorePost(h.DB, &post, req.Files); err != nil {
		return err
	}

	return req.SendMessageWithData(c, http.StatusCreated, lang.TransCtx(c, "post created"), post)
}

// CommentPost is the handler to add a comment to a post
// @Summary Comment a post
// @Description Comment a post
// @Tags Posts
// @Accept  json
// @Produce  json
// @Param Authorization header string true "With the bearer started"
// @Param id path int true "Post ID"
// @Param comment body request.CommentPostRequest true "Comment"
// @Success 201 {object} model.Comment
// @Router /posts/:id/comments [post]
func (h *Handler) CommentPost(c echo.Context) error {
	req := request.NewCommentPostRequest(c)

	if err := c.Validate(req); err != nil {
		return err
	}

	post := service.FindPost(h.DB, req.Post)

	if !service.BelongsToSection(h.DB, req.UserID, post.SectionID) {
		return errors.NewDefaultForbiddenCtx(c)
	}

	comment := req.Comment()

	if err := service.StoreComment(h.DB, &comment); err != nil {
		return err
	}

	return req.SendMessageWithData(c, http.StatusCreated, lang.TransCtx(c, "stored comment"), comment)
}
