---
home: true
navbar: true
hideNavbarLogo: false
heroImage: /images/cuttlefish.jpg
heroText:
tagline: The KUbernetes Test TooL (kuttl)
actionText: ⇝ Get Started ⇜
actionLink: /docs/
footer: Written in Go, maintained by good people.

---

<div class="flex-container">

::: flex-box
<h4>Focus on your software …</h4>
The KUbernetes Test TooL (KUTTL) is a highly productive toolkit for writing tests agaisnt Kubernetes operators and controllers.
:::

::: flex-box
<h4>… not on testing challenges</h4>
Using KUTTL you can test Kubernetes applications, controllers and operators in a cluster environment, using YAML the way you already know.
:::

::: flex-box
<h4>Testing Safety Net</h4>
All software targetted for production use needs to have tests, and ever changing distributed cluster environments ampilify that need.  KUTTL accelerates the ability to create end-to-end testing in a kubernetes environoment.
:::

</div>


## What is KUTTL?

The KUbernetes Test TooL (KUTTL) is a toolkit that makes it easy to test [Kubernetes Operators](https://kudo.dev/#what-are-operators), just using YAML.

It provides a way to inject an operator (subject under test) during the TestSuite setup and allows tests to be standard YAML files.  Test assertions are often partial YAML documents which assert the state defined is true.

It is also possible to have KUTTL automate the setup of a cluster.


## KUTTL is for you if...

<div class="flex-container">

::: flex-box
You are an application administrator who wants to automate the creation of a new Kubernetes environment.
:::

::: flex-box
You are a developer who wants an easy way to test Operators, without writing Go.
:::

::: flex-box
You are developer or QA and you want to test different combinations of Kubernete applications (helm, kudo, operator sdk operators).  
:::

::: flex-box
You want to test Kubernetes applications on multiple versions of Kubernetes.
:::

</div>

## Get KUTTL

```bash
$ brew tap kudobuilder/tap
$ brew install kuttl-cli
$ kubectl kuttl version
```

It's insanely easy to get started with KUTTL - follow this [handy guide](/docs/)!


## Join the KUDO Community

[Get started](docs/README.md) with KUTTL today, join the [community](https://kudo.dev/community/), and build your next operator with KUDO!

You can find more talks, tutorials, and events on our [community page](https://kudo.dev/community/#community-content).

KUDO is used by:

<div class="flex-container">

<Logo alt="MayaData" img="/images/logos/mayadata.jpg" url="https://mayadata.io/" />

<Logo alt="ArangoDB" img="/images/logos/arangodb.png" url="https://arangodb.com/" />

<Logo alt="D2iQ" img="/images/logos/d2iq.png" url="https://d2iq.com/" />

</div>
