-- +goose Up
-- +goose StatementBegin
CREATE TABLE posts (
    id              BIGSERIAL PRIMARY KEY,
    content         TEXT NOT NULL,
    user_id         TEXT NOT NULL,
    posteable_type  TEXT NOT NULL,
    posteable_id    BIGINT NOT NULL,
    type            BIGINT NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE,
    updated_at      TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
);

CREATE INDEX idx_posts_posteable ON posts (posteable_type, posteable_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE posts;
-- +goose StatementEnd
