-- +goose Up
-- +goose StatementBegin
CREATE TABLE sections (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    class_id INT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE,
    updated_at  TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE sections;
-- +goose StatementEnd
