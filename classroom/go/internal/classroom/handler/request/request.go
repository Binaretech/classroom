package request

import (
	"net/http"

	"github.com/Binaretech/classroom/internal/classroom/database"
	"github.com/Binaretech/classroom/internal/classroom/handler/resource"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Request struct{}

type ShowResourceRequest[T any] struct {
	Request
}

func NewShowResourceRequest[T any](c echo.Context) ShowResourceRequest[T] {
	return ShowResourceRequest[T]{}
}

func (req *ShowResourceRequest[T]) SendResource(c echo.Context, data *T) error {
	return c.JSON(http.StatusOK, data)
}

// PaginationRequest is a request with pagination information.
type PaginationRequest[T any] struct {
	Page  int `query:"page" validate:"omitempty,numeric"`
	Limit int `query:"limit" validate:"omitempty,numeric"`
}

func NewPaginatedRequest[T any](c echo.Context) PaginationRequest[T] {
	req := PaginationRequest[T]{}

	c.Bind(&req)

	if req.Page < 1 {
		req.Page = 1
	}

	if req.Limit < 1 {
		req.Limit = 10
	}

	return req
}

func (req *PaginationRequest[T]) Paginate(query *gorm.DB) *gorm.DB {
	return database.PaginateQuery(query, req.Limit, req.Page)
}

func (req *PaginationRequest[T]) SendPaginatedResource(c echo.Context, query *gorm.DB) error {
	data := make([]T, req.Limit)

	var count int64
	query.Count(&count)

	query.Limit(req.Limit).Offset((req.Page - 1) * req.Limit).Find(&data)

	var pages int

	if count == 0 {
		pages = 0
	} else {
		pages = int(int(count) / req.Limit)
	}

	return c.JSON(http.StatusOK, &resource.PaginatedResource{
		Page:  req.Page,
		Limit: req.Limit,
		Total: count,
		Pages: pages,
		Data:  data,
	})
}

func (req *Request) SendMessage(c echo.Context, message string) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": message,
	})
}

func (req *Request) SendMessageWithData(c echo.Context, status int, message string, data any) error {
	return c.JSON(status, resource.MessageWithDataResource{
		Data:    data,
		Message: message,
	})
}

func (req *Request) SendData(c echo.Context, data any) error {
	return c.JSON(http.StatusOK, resource.DataResource[any]{
		Data: data,
	})
}

func SendMessage(c echo.Context, message string) error {
	return (&Request{}).SendMessage(c, message)
}
