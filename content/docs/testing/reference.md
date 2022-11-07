# KUTTL Configuration Reference

<h2>Table of Contents</h2>

[[toc]]

## TestSuite

The `TestSuite` object specifies the settings for the entire test suite and should live in the test suite configuration file (`kuttl-test.yaml` by default, or `--config`):

```yaml
apiVersion: kuttl.dev/v1beta1
kind: TestSuite
startKIND: true
kindContainers:
- your/image:latest
testDirs:
- tests/e2e/
timeout: 120
```

Supported settings:

| Field             | Type                        | Description                                                                                                                                                                                         | Default      |
|-------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| crdDir            | string                      | Path to CRDs to install before running tests. KUTTL waits for CRDs to be available prior to starting tests.                                                                                         |              |
| manifestDirs      | list of strings             | Paths to manifests to install before running tests.                                                                                                                                                 |              |
| testDirs          | list of strings             | Directories containing test cases to run.                                                                                                                                                           |              |
| startControlPlane | bool                        | Whether or not to start a local etcd and kubernetes API server for the tests.                                                                                                                       | false        |
| startKIND         | bool                        | Whether or not to start a local kind cluster for the tests.                                                                                                                                         | false        |
| kindNodeCache     | bool                        | If set, each node defined in the kind configuration will have a docker volume mounted into it to persist pulled container images across test runs                                                   | false        |
| kindConfig        | string                      | Path to the KIND configuration file to use.                                                                                                                                                         |              |
| kindContext       | string                      | KIND context to use.                                                                                                                                                                                | "kind"       |
| skipDelete        | bool                        | If set, do not delete the resources after running the tests (implies SkipClusterDelete).                                                                                                            | false        |
| skipClusterDelete | bool                        | If set, do not delete the mocked control plane or kind cluster.                                                                                                                                     | false        |
| timeout           | int                         | Override the default timeout of 30 seconds (in seconds).                                                                                                                                            | 30           |
| parallel          | int                         | The maximum number of tests to run at once.                                                                                                                                                         | 8            |
| artifactsDir      | string                      | The directory to output artifacts to (current working directory if not specified).                                                                                                                  | .            |
| commands          | list of [Command](#command) | Commands to run prior to running the tests.                                                                                                                                                         | []           |
| kindContainers    | list of strings             | List of Docker images to load into the KIND cluster once it is started.                                                                                                                             | []           |
| reportFormat      | string                      | Determines the report format. If empty, no report is generated. One of: JSON, XML.                                                                                                                  |              |
| reportName        | string                      | The name of report to create. This field is not used unless reportFormat is set.                                                                                                                    | "kuttl-test" |
| namespace         | string                      | The namespace to use for tests. This namespace will be created if it does not exist and removed if it was created (unless `skipDelete` is set). If no namespace is set, one will be auto-generated. |              |
| suppress          | list of strings             | Suppresses log collection of the specified types. Currently only `events` is supported.                                                                                                             |              |
## TestStep

The `TestStep` object can be used to specify settings for a test step and can be specified in any test step YAML.

Its `apply`, `assert` and `error` settings may be useful to reuse a number of applies across tests / test steps. See [KEP-0004-test-composability](https://github.com/kudobuilder/kuttl/blob/b95698f/keps/0004-test-composability.md) for more details and examples.

```yaml
apiVersion: kuttl.dev/v1beta1
kind: TestStep
delete:
- apiVersion: v1
  kind: Pod
  name: my-pod
commands:
- command: helm init
```

Supported settings:

| Field    | Type                                                                                                                          | Description                                                                                                                                                                                                  |
|----------|-------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| delete   | list of [object reference](#object-reference)                                                                                 | A list of objects to delete, if they do not already exist, at the beginning of the test step. The test harness will wait for the objects to be successfully deleted before applying the objects in the step. |
| index    | int                                                                                                                           | Override the test step's index.                                                                                                                                                                              |
| commands | list of [Command](#command)                                                                                                   | Commands to run prior at the beginning of the test step.                                                                                                                                                     |
| apply    | list of String (paths). Each path may point to a file or directory, and is relative to the TestStep the folder is defined in. | List of resources to be *applied* in this step                                                                                                                                                               |
| assert   | list of String (paths). Each path may point to a file or directory, and is relative to the TestStep the folder is defined in. | List of resources to be *assert expected* in this step                                                                                                                                                       |
| error    | list of String (paths). Each path may point to a file or directory, and is relative to the TestStep the folder is defined in. | List of resources to be *assert errored* in this step                                                                                                                                                        |



### Object Reference

| Field      | Type   | Description                                                                                                                                                                                  |
|------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiVersion | string | The Kubernetes API version of the objects to delete.                                                                                                                                         |
| kind       | string | The Kubernetes kind of the objects to delete.                                                                                                                                                |
| name       | string | If specified, the name of the object to delete. If not specified, all objects that match the specified labels will be deleted.                                                               |
| namespace  | string | The namespace of the objects to delete.                                                                                                                                                      |
| labels     | map    | If specified, a label selector to use when looking up objects to delete. If both labels and name are unspecified, then all resources of the specified kind in the namespace will be deleted. |

## TestAssert

The `TestAssert` object can be used to specify settings for a test step's assert and must be specified in the test step's assert YAML.

```yaml
apiVersion: kuttl.dev/v1beta1
kind: TestAssert
timeout: 30
```

Supported settings:

| Field   | Type | Description                                           | Default |
|---------|------|-------------------------------------------------------|---------|
| timeout | int  | Number of seconds that the test is allowed to run for | 30      |

## Command

The `Command` object is used by `TestSteps` and `TestSuites` to enable running commands in tests:

| Field         | Type   | Description                                                                                                                                                                                                           |
|---------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| command       | string | The command and argument to run as a string.                                                                                                                                                                          |
| script        | string | Allows a shell script to run - namespaced and command should not be used with script.  namespaced is ignored and command is an error.  env expansion is depended upon the shell but ENV is passed to the runtime env. |
| namespaced    | bool   | If set, the `--namespace` flag will be appended to the command with the namespace to use (the test namespace for a test step or "default" for the test suite).                                                        |
| ignoreFailure | bool   | If set, failures will be ignored.                                                                                                                                                                                     |
| background    | bool   | If this command is to be started in the background. These are only support in TestSuites.                                                                                                                             |
| skipLogOutput | bool   | If set, the output from the command is *not* logged. Useful for sensitive logs or to reduce noise.                                                                                                                    |
| timeout       | int    | Override the TestSuite timeout for this command (in seconds).                                                                                                                                                         |
