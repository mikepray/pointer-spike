## build
```
docker build . -t pointer-backend
```

## run
> Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:

```
docker run -p 8080:8080 -d mike/pointer-backend
```

Print the output of your app:

# Get container ID
`$ docker ps`

# Print app output
`$ docker logs <container id>`

If you need to go inside the container you can use the exec command:

# Enter the container
`$ docker exec -it <container id> /bin/bash`


## other stuff

(couchbase is no longer used) 

Couchbase reqs:
- requires cmake installed:
`brew install cmake`
- requires node 16 for couchbase

```docker run -d --name db -p 8091-8094:8091-8094 -p 11210:11210 couchbase
```

Step - 2 : Next, visit http://localhost:8091 on the host machine to see the Web Console to start Couchbase Server setup.

