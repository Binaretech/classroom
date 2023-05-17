FROM golang:1.20

RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

COPY . /app/

ENV CGO_ENABLED=0

RUN go install github.com/swaggo/swag/cmd/swag@latest

RUN go mod tidy