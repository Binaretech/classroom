-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE,
    updated_at  TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd