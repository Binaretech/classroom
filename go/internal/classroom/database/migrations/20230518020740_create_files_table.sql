-- +goose Up
-- +goose StatementBegin
CREATE TABLE files (
    id BIGSERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    type SMALLINT NOT NULL,
    bucket VARCHAR(255) NOT NULL,
    mime_type VARCHAR(32) NOT NULL,
    fileable_type VARCHAR(30) NOT NULL,
    fileable_id VARCHAR(64),
    created_at  TIMESTAMP WITH TIME ZONE,
    updated_at  TIMESTAMP WITH TIME ZONE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE Files;
-- +goose StatementEnd
