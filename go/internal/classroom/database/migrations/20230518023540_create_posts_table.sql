-- +goose Up
-- +goose StatementBegin
CREATE TABLE posts (
    id         BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL,
    content    TEXT NOT NULL,
    user_id    TEXT NOT NULL,
    type       BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE posts;
-- +goose StatementEnd
