-- +goose Up
-- +goose StatementBegin
CREATE TABLE materials (
    id                BIGSERIAL PRIMARY KEY,
    title             VARCHAR(128) NOT NULL,
    description       TEXT NOT NULL,
    materialable_id   BIGINT NOT NULL,
    materialable_type VARCHAR(32) NOT NULL,
    created_at        TIMESTAMP WITH TIME ZONE,
    updated_at        TIMESTAMP WITH TIME ZONE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE materials;
-- +goose StatementEnd
