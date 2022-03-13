## Simple API server 

A simple node-express API server. 

All js code is in index.js. No [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete), it only reads and returns information from a local json file.

All entries are under path `/years` (shows all data), e.g. `/years/2015` (shows only the specified year) or `/years/2015/<key>` where `<key>` is one of the json object keys.

Dockerfile to build a container image.

### Local testing


```
node index.js
``` 

Opens in http://localhost:8080

### Test with docker


```
docker build --tag cms-info-server .
docker run -p 8080:8080 cms-info-server
```

Opens in http://localhost:8080

### Deploy in minikube


```
minikube start
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
minikube service info-server
```

Opens in the URL indicated in the message. `deployment.yaml` uses an existing image from dockerhub.

### Deploy in GKE

A test can be deployed with the workflow in `.github/workflows/main.yaml` to an existing GKE cluster with the name and zone indicated in the workflow environment variables (GKE_CLUSTER and GKE_ZONE). Requires the project ID and a service account key in the repository secrets. The workflow does **not** build a new image but uses an existing one from dockerhub, i.e. it is not a proper deployment of what is in the repository.

Opens in the URL indicated in the Google Cloud platform dashboard under "Services".

