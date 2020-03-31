# Test Environments

The KUTTL test harness can run tests against several different test environments, allowing your test suites to be used in many different environments.

A default environment for the tests can be defined in `kuttl-test.yaml` allowing each test suite or project to easily use the correct environment.

[[toc]]

## Live Cluster

If no configuration is provided, the tests will run against your default cluster context using whatever Kubernetes cluster is configured in your kubeconfig.

You can also provide an alternative kubeconfig file by either setting `$KUBECONFIG` or the `--kubeconfig` flag:

```bash
kubectl kuttl test --kubeconfig=mycluster.yaml
```

## Kubernetes-in-docker

The KDUO test harness has a built in integration with [kind](https://github.com/kubernetes-sigs/kind) to start and interact with kubernetes-in-docker clusters.

To start a kind cluster in your tests either specify it on the command line:

```bash
kubectl kuttl test --start-kind=true
```

Or specify it in your `kuttl-test.yaml`:

```yaml
apiVersion: kudo.k8s.io/v1alpha1
kind: TestSuite
kindNodeCache: true
```

By default KUTTL will use the default kind cluster name of "kind". If a kind cluster is already running with that name, it will use the existing cluster.

The kind cluster name can be overriden by setting either `kindContext` in your configuration or `--kind-context` on the command line.

By setting `kindNodeCache`, the containerd directories will be mounted into a Docker volume in order to persist the images pulled during a test run across test runs.

If you want to load images into the built KIND cluster that have not been pushed, set `kindContainers`. See [Tips And Tricks](tips.md#loading-built-images-into-kind) for an example.

It is also possible to provide a custom kind configuration file. For example, to override the Kubernetes cluster version, create a kind configuration file called `kind.yaml`:

```yaml
kind: Cluster
apiVersion: kind.sigs.k8s.io/v1alpha3
nodes:
- role: control-plane
  image: kindest/node:v1.14.3
```

See the [kind documentation](https://kind.sigs.k8s.io/docs/user/quick-start/#configuring-your-kind-cluster) for all options supported by kind.

Now specify either `--kind-config` or `kindConfig` in your configuration file:

```bash
kubectl kuttl test --kind-config=kind.yaml
```

*Note*: Once the tests have been completed, the test harness will collect the kind cluster's logs and then delete it, unless `--skip-cluster-delete` has been set.

## Mocked Control Plane

The above environments are great for end to end testing, however, for integration test use-cases it may be unnecessary to create actual pods or other resources. This can make the tests a lot more flaky or slow than they need to be.

To write integration tests using the KUTTL test harness, it is possible to start a mocked control plane that starts only the Kubernetes API server and etcd. In this environment, objects can be created and operated on by custom controllers, however, there is no scheduler, nodes, or built-in controllers. This means that pods will never run and built-in types, such as, deployments cannot create pods.

Kubernetes controllers can be added to this environment by using the TestSuite configuration command in  order to start the controller:

```
commands:
  - command: ./bin/manager
    background: true
```

To start the mocked control plane, specify either `--start-control-plane` on the CLI or `startControlPlane` in the configuration file:

```bash
kubectl kuttl test --start-control-plane
```

## Environment Setup

Before running a test suite, it may be necessary to setup the Kubernetes cluster - typically, either installing required services or custom resource definitions.

Your `kuttl-test.yaml` can specify the settings needed to setup the cluster:

```yaml
apiVersion: kudo.dev/v1alpha1
kind: TestSuite
startKIND: true
testDirs:
- tests/e2e/
manifestDirs:
- tests/manifests/
crdDir: tests/crds/
commands:
  - command: kubectl apply -f https://raw.githubusercontent.com/kudobuilder/kudo/master/docs/deployment/10-crds.yaml
```

The above configuration would start kind, install all of the CRDs in `tests/crds/`, and run all of the commands defined in `kubectl` before running the tests in `testDirs`.

See the [configuration reference](reference.md#testsuite) for documentation on configuring test suites.

### Starting a Kubernetes Controller

In some test suites, it may be useful to have a controller running. To start a controller, add a configuration as a command in the TestSuite configuration file `kuttl-test.yaml`:

For a KUDO, an example of deploying an previously released controller would look like:

```
commands:
  - command: kubectl kudo init --wait
```

The KUDO CLI has a readiness watch on the installation of the KUDO manager.  When it exits, the KUDO manager is ready.

Another commonly explain is the starting of a manager that is still in development.  The assumption of the code snippet below is that a `make manager` or Makefile target generated a manager in the `bin` folder.

```
commands:
  - command: ./bin/manager
    background: true
```
