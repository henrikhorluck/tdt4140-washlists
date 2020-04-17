# Docker setup

This document assumes you have some familiarity with [Docker](https://docs.docker.com/) already.

# Build the images

```bash
docker build frontend -t sif_frontend
docker build backend -t sif_backend 
```

# Run the containers

Here we set the frontend container to use the same network as the backend, so that they can communicate with each other. 

```bash
# We want to expose both port 3000 and 8000, so that frontend and backend is available, running in detached mode.
docker run -d -p 3000:3000 -p 8000:8000 sif_backend python manage.py runserver 0.0.0.0:8000
# Here you need to paste in the container ID, which was outputted by the previous command
docker run -d --net=container:<CONTAINER_ID> sif_frontend
```

You can enter the containers by using, the ID is found by using `docker ps`
```bash
docker exec -it <CONTAINER_ID> bash
```

You can stop the containers by running:
```bash
docker stop <CONTAINER_ID>
```
