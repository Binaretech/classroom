-- +goose Up
-- +goose StatementBegin
CREATE TABLE classes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(255),
    owner_id VARCHAR(64) NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP WITH TIME ZONE,
    updated_at  TIMESTAMP WITH TIME ZONE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE classes;
-- +goose StatementEnd
