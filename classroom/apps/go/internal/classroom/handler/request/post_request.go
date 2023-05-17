package request

import (
	"mime/multipart"
	"strconv"

	"github.com/Binaretech/classroom/internal/classroom/database/model"
	"github.com/Binaretech/classroom/pkg/utils/auth"
	"github.com/labstack/echo/v4"
)

type SectionPostRequest struct {
	PaginationRequest[model.Post]
	ID string `validate:"required,exists=sections"`
}

// NewSectionPostRequest creates a new SectionPostRequest
func NewSectionPostRequest(c echo.Context, sectionId string) SectionPostRequest {
	return SectionPostRequest{
		PaginationRequest: NewPaginatedRequest[model.Post](c),
		ID:                sectionId,
	}
}

type StorePostRequest struct {
	Request
	Section uint                    `form:"section" json:"section" validate:"required,exists=sections;id"`
	Content string                  `validate:"required" json:"content" form:"content"`
	UserID  string                  `validate:"required,exists=users;id"`
	Files   []*multipart.FileHeader `json:"-"`
}

// NewStorePostRequest creates a new StorePostRequest
func NewStorePostRequest(c echo.Context) *StorePostRequest {
	req := StorePostRequest{}

	c.Bind(&req)

	form, err := c.MultipartForm()

	var files []*multipart.FileHeader

	if err != nil {
		files = []*multipart.FileHeader{}
	} else {
		files = form.File["files"]
	}

	req.Files = files

	userId := auth.UserID(c)

	section, _ := strconv.Atoi(c.Param("id"))

	req.UserID = userId
	req.Section = uint(section)

	return &req
}

// Post returns a post model from request
func (req *StorePostRequest) Post() model.Post {

	return model.Post{
		SectionID: req.Section,
		Content:   req.Content,
		UserID:    req.UserID,
		Type:      model.POST_TYPE_USER_POST,
	}
}

type CommentPostRequest struct {
	Request
	Content string `json:"content" validate:"required"`
	UserID  string `json:"userId"`
	Post    uint   `json:"post" validate:"required,exists=posts;id"`
}

// NewCommentPostRequest creates a new CommentPostRequest
func NewCommentPostRequest(c echo.Context) CommentPostRequest {
	userId := auth.UserID(c)

	post, _ := strconv.Atoi(c.Param("id"))

	req := CommentPostRequest{
		UserID: userId,
		Post:   uint(post),
	}

	c.Bind(&req)

	return req
}

// Comment returns a comment model from request
func (req *CommentPostRequest) Comment() model.Comment {
	return model.Comment{
		Content: req.Content,
		UserID:  req.UserID,
		PostID:  req.Post,
	}
}
