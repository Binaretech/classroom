package handler

import (
	"net/http"

	// _ "github.com/Binaretech/classroom/internal/classroom/docs"
	"github.com/labstack/echo/v4"
)

func (h *Handler) Routes(api *echo.Group) {
	api.GET("/healthcheck", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	api.GET("/users", h.User)
	api.POST("/users", h.StoreUser)
	api.PUT("/users", h.UpdateUser)
	api.GET("/users/email", h.SearchUserByEmail)

	api.GET("/classes", h.UserClasses)
	api.POST("/classes", h.CreateClass)
	api.GET("/classes/:id", h.ShowClass)
	api.DELETE("/classes/:id", h.DeleteClass)
	api.GET("/classes/:id/members", h.ClassMembers)
	api.GET("/classes/:id/sections", h.GetClassSections)
	api.POST("/classes/:id/archive", h.ArchiveClass)
	api.POST("/classes/:id/unarchive", h.UnarchiveClass)

	api.POST("/sections", h.CreateSection)
	api.GET("/sections/:id", h.ShowSection)
	api.DELETE("/sections/:id", h.DeleteSection)
	api.GET("/sections/:id/members", h.SectionMembers)
	api.POST("/sections/:id/members", h.AddMember)
	api.DELETE("/sections/:id/members/:userId", h.RemoveMember)
	api.GET("/sections/:id/posts", h.SectionPosts)
	api.POST("/sections/:id/posts", h.StoreSectionPost)

	api.GET("/posts/recent", h.GetRecentPosts)
}
