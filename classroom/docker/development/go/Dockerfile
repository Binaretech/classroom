FROM golang:1.20

RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

RUN go install github.com/swaggo/swag/cmd/swag@latest
