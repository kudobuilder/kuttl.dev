DOCKER_TAG ?=$(shell git rev-parse --short HEAD)
DOCKER_IMG ?= kudobuilder/www

.PHONY: docker-build
docker-build:
	DOCKER_BUILDKIT=1 docker build -t ${DOCKER_IMG}:${DOCKER_TAG} .

.PHONY: docker-run
docker-run:
	docker run -it --rm --name=kuttlwww -p 8080:8080 -v ${PWD}:/app ${DOCKER_IMG}:${DOCKER_TAG}

.PHONY: build
build:
	yarn docs:build

.PHONY: local-run
local-run:
	yarn docs:dev

.PHONY: lint
lint:
	yarn docs:lint
