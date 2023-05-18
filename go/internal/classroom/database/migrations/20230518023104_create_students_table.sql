-- +goose Up
-- +goose StatementBegin
CREATE TABLE students (
    section_id BIGINT NOT NULL,
    user_id    TEXT NOT NULL,
    CONSTRAINT fk_students_section
        FOREIGN KEY (section_id)
        REFERENCES sections (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_students_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (section_id, user_id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE students;
-- +goose StatementEnd
