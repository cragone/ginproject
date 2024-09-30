#build the go application
FROM golang:1.20 AS build

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
FROM gin:latest

#set the current working directory inside container
WORKDIR /server

#copy the pre built binary file from the previous stage
COPY --from=build /server/main .

#copy dist containing react build
COPY --from=build /server/dist ./dist

#copy the assets folder
COPY --from=build /server/assets ./assets

#expose port 8080 to outside world
EXPOSE 8080

#command to run the executable
CMD ["./main"]