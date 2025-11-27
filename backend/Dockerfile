FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/server .
ENV APP_VERSION=v1.0.0
EXPOSE 8080
CMD ["./server"]
