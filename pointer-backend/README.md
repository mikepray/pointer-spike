## build
```
docker build . -t mike/pointer-backend
```

## run
> Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:

```
docker run -p 8082:8080 -d mike/pointer-backend
```

Print the output of your app:

# Get container ID
`$ docker ps`

# Print app output
`$ docker logs <container id>`

If you need to go inside the container you can use the exec command:

# Enter the container
`$ docker exec -it <container id> /bin/bash`
