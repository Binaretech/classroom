-- +goose Up
-- +goose StatementBegin
CREATE TABLE section_invites (
    id          BIGSERIAL PRIMARY KEY,
    section_id  BIGINT NOT NULL,
    email       TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE,
    updated_at  TIMESTAMP WITH TIME ZONE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE section_invites;
-- +goose StatementEnd
