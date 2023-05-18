-- +goose Up
-- +goose StatementBegin
CREATE TABLE comments (
    id         BIGSERIAL PRIMARY KEY,
    content    TEXT,
    user_id    TEXT,
    post_id    BIGINT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT fk_posts_comments
        FOREIGN KEY (post_id)
        REFERENCES posts (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE comments;
-- +goose StatementEnd
