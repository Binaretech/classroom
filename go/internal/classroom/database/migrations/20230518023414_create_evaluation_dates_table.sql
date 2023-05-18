-- +goose Up
-- +goose StatementBegin
CREATE TABLE evaluation_dates (
    module_id  BIGINT NOT NULL,
    section_id BIGINT NOT NULL,
    date       TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (module_id, section_id),
    CONSTRAINT fk_evaluation_dates_module
        FOREIGN KEY (module_id)
        REFERENCES modules (id),
    CONSTRAINT fk_evaluation_dates_section
        FOREIGN KEY (section_id)
        REFERENCES sections (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE evaluation_dates;
-- +goose StatementEnd
