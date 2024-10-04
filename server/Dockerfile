#build the go application
FROM golang:1.22-alpine AS build

#set the current working directory inside the container
WORKDIR /server

# copy go mod and sum files
COPY go.mod go.sum ./

#download all dependencies
RUN go mod download

#copy the source code into the container
COPY . .

#Build the go app
RUN go build -o main .

#serve the application
FROM alpine:latest

#set the current working directory inside container
WORKDIR /server

#install necessary packages 
RUN apk --no-cache add ca-certificates

#copy the pre built binary file from the previous stage
COPY --from=build /server/main .

#copy dist containing react build
COPY --from=build /server/dist ./dist

#copy the assets folder
COPY --from=build /server/dist/assets ./assets

#copy the env
COPY --from=build /server/.env /server/.env

#expose port 8080 to outside world
EXPOSE 80

#command to run the executable
CMD ["./main"]


