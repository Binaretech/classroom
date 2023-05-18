-- +goose Up
-- +goose StatementBegin
CREATE TABLE user_participants (
    participant_id BIGINT NOT NULL,
    user_id        TEXT NOT NULL,
    CONSTRAINT fk_user_participants_participant
        FOREIGN KEY (participant_id)
        REFERENCES participants (id),
    CONSTRAINT fk_user_participants_user
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    PRIMARY KEY (participant_id, user_id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE user_participants;
-- +goose StatementEnd
