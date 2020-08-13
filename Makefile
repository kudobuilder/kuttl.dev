DOCKER_TAG ?=$(shell git rev-parse --short HEAD)
DOCKER_IMG ?= kudobuilder/kuttl.dev

.PHONY: help
help: ## Show this help screen
	@echo 'Usage: make <OPTIONS> ... <TARGETS>'
	@echo ''
	@echo 'Available targets are:'
	@echo ''
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


##############################
# Development                #
##############################

##@ Development

.PHONY: build
build: ## build (requires yarn++)
	yarn docs:build

.PHONY: docker-build
docker-build:  ## build docker image (useful you're looking to build without setting up build dependencies)
	DOCKER_BUILDKIT=1 docker build -t ${DOCKER_IMG}:${DOCKER_TAG} .

.PHONY: lint
lint:  ## Run yarn docs:lint (checks for broken links etc.)
	yarn docs:lint


##############################
# Running Locally            #
##############################

##@ Running


.PHONY: local-run
local-run: ## Yarn run local
	yarn docs:dev

.PHONY: docker-run
docker-run:  ## Run locally without dependency setup
	docker run -it --rm --name=kuttlwww -p 8080:8080 -v ${PWD}:/app ${DOCKER_IMG}:${DOCKER_TAG}
