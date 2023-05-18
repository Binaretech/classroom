-- +goose Up
-- +goose StatementBegin
CREATE TABLE participants (
    id            BIGSERIAL PRIMARY KEY,
    assignment_id BIGINT NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE,
    updated_at    TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_participants_assignment
        FOREIGN KEY (assignment_id)
        REFERENCES assignments (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE participants;
-- +goose StatementEnd
