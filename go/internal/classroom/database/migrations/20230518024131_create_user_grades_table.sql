-- +goose Up
-- +goose StatementBegin
CREATE TABLE grades (
    id             BIGSERIAL PRIMARY KEY,
    participant_id BIGINT NOT NULL,
    created_at     TIMESTAMP WITH TIME ZONE,
    updated_at     TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_grades_participant
        FOREIGN KEY (participant_id)
        REFERENCES participants (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE grades;
-- +goose StatementEnd
