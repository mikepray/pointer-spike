# Planning Poker

## Development:
Run `tsc --watch` in each top-level directory. Run `npm start` in `pointer-backend` and `pointer-frontend`

Shared library is hosted in npm

visit at `localhost:3000`

## Docker compose:

`docker compose up`

visit at `localhost`

## minikube

have to tag the docker image. otherwise minikube will try to look for the image in docker hub. then need to load the images in minikube's cache:

`docker tag pointer-frontend-12:latest pointer-frontend-12:1`   

`minikube image load pointer-frontend-12:1`

Apply the services and deployments

`minikube kubectl -- apply -f frontend-deployment.yaml`

current problem:

## kubernetes build:

Start minikube:
```
minikube start --driver=docker
minikube tunnel
```

1. build docker images
    - `cd pointer-frontend && docker build . -t pointer-frontend:<version>`
    - `cd ../pointer-backend && docker build . -t pointer-backend:<version>`
2. Push images to minikube cache
    - `minikube image load pointer-frontend:1 && minikube image load pointer-backend:1`
3. Tear down kube deployments if needed:
    - `minikube kubectl -- delete -f frontend-deployment.yaml && minikube kubectl -- delete -f backend-deployment.yaml`
4. Apply deployments:
    - `minikube kubectl -- apply -f frontend-deployment.yaml && minikube kubectl -- apply -f backend-deployment.yaml`
