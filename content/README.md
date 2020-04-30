---
home: true
navbar: true
hideNavbarLogo: false
heroImage: /images/kuttl-horizontal-logo.png
heroText:
tagline: The KUbernetes Test TooL (kuttl)
actionText: ⇝ Get Started ⇜
actionLink: /docs/
footer: Written in Go, maintained by good people.

---

<div class="flex-container">

::: flex-box
<h4>Focus on your tests …</h4>
The KUbernetes Test TooL (KUTTL) is a highly productive toolkit for writing tests against Kubernetes operators and controllers.
:::

::: flex-box
<h4>… not on testing challenges</h4>
Using KUTTL you can test Kubernetes applications, controllers and operators in a cluster environment, using YAML the way you already know.
:::

::: flex-box
<h4>Testing Safety Net</h4>
All software targeted for production use needs to have tests, and ever changing distributed cluster environments amplify that need.  KUTTL accelerates the ability to create end-to-end testing in a kubernetes environment.
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
You are developer or QA and you want to test different combinations of Kubernetes applications (Helm, KUDO, Operator SDK operators).  
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

[Get started](docs/README.md) with KUTTL today, join the [KUDO community](https://kudo.dev/community/), and test your next operator with KUTTL!

You can find more talks, tutorials, and events on the KUDO [community page](https://kudo.dev/community/#community-content).
