# What is a KUTTL

[[toc]]

## Overview

Kubernetes Universal Declarative Operator (KUDO) provides a declarative approach to building production-grade Kubernetes [operators](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/). To quote the official documentation: _"Operators are software extensions to Kubernetes that make use of custom resources to manage applications and their components"_. While Kubernetes already comes with a lot of built-in automation to run simple workloads, complex scenarios often need a human operator. This is where KUDO is designed to help.

## Motivation

Building Kubernetes operators is not easy. While existing tools and libraries like [kubebuilder](https://book.kubebuilder.io/) and [Operator Framework](https://github.com/operator-framework/getting-started) and Kubernetes [control loop](https://kubernetes.io/docs/concepts/#kubernetes-control-plane) help with some aspects, developing an operator is still quite an undertaking. This is where the KUDO approach differs. It utilizes a Universal and Declarative approach (the UD in KUDO), doesn't require any code and significantly accelerates the development of operators. In a nutshell, KUDO does all the "Kubernetes heavy lifting" allowing the developers to concentrate on the task at hand.

## When would you use KUDO

KUDO is built to help Dev/Ops teams manage day 2 operations of services on Kubernetes, including stateful services through the management of operators. Day 2 in this context refers to the need to support more than just initial deployment. KUDO is built to support upgrades of services along with backup, recovery and the needs of observability. In a nutshell: you would use KUDO when `kubectl apply -f` (or `helm install`) isn't quite enough to manage your application lifecycle. Some examples are:

- you have a stateful service and need to automate specific workflows like backup and restore. Alternatively, you might need to execute extra logic when doing common tasks like needing to reshard when scaling up and down
- you have a micro-services application where deployment workflow has multiple serial or parallel stages (e.g. generating dynamic configuration or waiting for a migration to finish)
- you need to automate repetitive tasks around your application life-cycle like chaos and resilience testing

Find out more about how KUDO differs from other tools in the [comparison section](comparison/overview.md).

## Main Concepts

Let's talk about some concepts first. At the top level, there are _Operator Packages_.

::: attribute Operator Package
An _Operator Package_ is a collection of files that defines a KUDO operator. Think of it like a Helm Chart or Homebrew formula. An operator package can be local (a folder or tarball) or remote (tarball URL). An operator package has all the Kubernetes resources and workflow definitions to run your application.
:::

::: attribute Repository
A _Repository_ is a place that holds operator packages. It can be a local folder or a remote URL.
:::

::: attribute KUDO Manager
A _KUDO Manager_ is a set of Kubernetes controllers that understand KUDO operators and know how to execute plans.
:::

::: attribute Plan
A _Plan_ is the operator's main workflow unit. A plan specifies a series of steps that will apply or delete Kubernetes resources to the cluster in the defined order.
:::

**In a nutshell**: A user will take an _Operator Package_ from the _Repository_, submit it to the _KUDO Manager_ which will then execute operator _Plans_ either automatically or on-demand.
