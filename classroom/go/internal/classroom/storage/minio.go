package storage

import (
	"bytes"
	"context"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/spf13/viper"
)

type MinioStorage struct {
	client *minio.Client
}

func NewMinioStorage() *MinioStorage {
	endpoint := viper.GetString("s3_endpoint")
	accessKey := viper.GetString("s3_access_key")
	secretKey := viper.GetString("s3_secret_key")
	region := viper.GetString("s3_region")

	minioClient, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false,
		Region: region,
	})

	if err != nil {
		panic(err)
	}

	return &MinioStorage{client: minioClient}
}

func (s *MinioStorage) Put(bucket, key string, data []byte, contentType string) error {
	_, err := s.client.PutObject(context.Background(), bucket, key, bytes.NewBuffer(data), int64(len(data)), minio.PutObjectOptions{ContentType: contentType})

	return err
}

func (s *MinioStorage) Get(bucket, key string) ([]byte, error) {
	object, err := s.client.GetObject(context.Background(), bucket, key, minio.GetObjectOptions{})

	if err != nil {
		return nil, err
	}

	defer object.Close()

	buf := new(bytes.Buffer)
	buf.ReadFrom(object)

	return buf.Bytes(), nil
}

func (s *MinioStorage) Delete(bucket, key string) error {
	return s.client.RemoveObject(context.Background(), bucket, key, minio.RemoveObjectOptions{})
}
