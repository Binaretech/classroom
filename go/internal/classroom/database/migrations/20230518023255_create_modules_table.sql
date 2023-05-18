-- +goose Up
-- +goose StatementBegin
CREATE TABLE modules (
    id                  BIGSERIAL PRIMARY KEY,
    title               VARCHAR(128) NOT NULL,
    description         TEXT,
    evaluation_duration INTERVAL,
    class_id            BIGINT NOT NULL,
    created_at          TIMESTAMP WITH TIME ZONE,
    updated_at          TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_modules_class
        FOREIGN KEY (class_id)
        REFERENCES classes (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
