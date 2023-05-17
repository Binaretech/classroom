package resource

// PaginatedResponse is a response with pagination information.
type PaginatedResource struct {
	Page  int   `json:"page"`
	Limit int   `json:"limit"`
	Total int64 `json:"total"`
	Pages int   `json:"pages"`
	Data  any   `json:"data"`
}
