-- +goose Up
-- +goose StatementBegin
CREATE TABLE assignments (
    id                BIGSERIAL PRIMARY KEY,
    type              SMALLINT NOT NULL,
    due               TIMESTAMP WITH TIME ZONE NOT NULL,
    description       TEXT,
    weight            NUMERIC NOT NULL,
    grade             NUMERIC(5, 2),
    base_grade        NUMERIC(5, 2),
    participant_count INTEGER DEFAULT 1 NOT NULL,
    class_id          BIGINT NOT NULL,
    created_at        TIMESTAMP WITH TIME ZONE,
    updated_at        TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_assignments_class
        FOREIGN KEY (class_id)
        REFERENCES classes (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE assignments;
-- +goose StatementEnd
