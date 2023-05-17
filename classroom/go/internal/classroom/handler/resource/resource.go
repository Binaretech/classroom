package resource

type DataResource[T any] struct {
	Data T `json:"data"`
}

type MessageResource struct {
	Message string `json:"message"`
}

type MessageWithDataResource struct {
	Message string `json:"message"`
	Data    any    `json:"data"`
}
