package storage

const (
	USERS_BUCKET = "user"
	POSTS_BUCKET = "posts"
)

type Storage interface {
	Put(bucket, key string, data []byte, contentType string) error
	Get(bucket, key string) ([]byte, error)
	Delete(bucket, key string) error
}

var client Storage

func OpenStorage() {
	client = NewMinioStorage()
}

func Put(bucket, key string, data []byte, contentType string) error {
	return client.Put(bucket, key, data, contentType)
}

func Get(bucket, key string) ([]byte, error) {
	return client.Get(bucket, key)
}
