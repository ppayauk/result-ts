# Rust's Result for Typescript.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Using fp-ts Either, but with easier naming

## Why?

- [Expressive error handling in TypeScript and benefits for domain-driven design](https://medium.com/inato/expressive-error-handling-in-typescript-and-benefits-for-domain-driven-design-70726e061c86)

## How?

- [Mimicing Rust's Result type in TypeScript](https://dev.to/duunitori/mimicing-rust-s-result-type-in-typescript-3pn1)
- [Type-Safe Error Handling In TypeScript](https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n)
- [From rust to Typescript](https://valand.dev/blog/post/from-rust-to-typescript)

## Examples

See the [examples](./examples) directory

## Devlopment

### Prerequisites

Docker

### Running

The project contains a dev-container that has a prebuilt dev environment with node installed.
run `make` to build

## CI

Github Actions runs makefile commands to test, lint, built, format, coverage before pull requests can be merged. See [ci.yml](.github/workflows/ci.yml)
Debug with `make debug-actions`. This uses act to run the workflows locally.

## CD

Github Actions automatically publishes commits to main to NPM. See [cd.yml](.github/workflows/cd.yml)
