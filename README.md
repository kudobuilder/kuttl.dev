Just practice

# KUTTL Website

The KUTTL web site is build using [VuePress](https://v1.vuepress.vuejs.org/).

### Building the site locally

* Install [NodeJS](https://nodejs.org/en/download/)
* Install [Yarn](https://yarnpkg.com/lang/en/docs/install/)

In the root of the project, run
```bash
yarn install
make build
yarn docs:dev

#or make local-run target calls yarm docs:dev
make local-run
```

The output will inform you about the address the site is served (usually http://localhost:8080).

#### Via Docker
You can choose to install and run the above dependencies in a Docker container instead, if you do not wish to pollute your local environment.

First, build the development image with:

```bash
make docker-build
```

And then run VuePress in a container from this image by doing:

```bash
make docker-run
```


## Documentation Guidelines

Please follow the [documentation guidelines](https://kudo.dev/internal-docs/#general-guidelines), which are pretty high level for now.  The KUTTL docs current follow the KUDO guidelines and processes.   See http://kudo.dev for more details.
