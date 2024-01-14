## Description

[Nest](https://github.com/nestjs/nest) based tour service

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Static Files

The tour service hosts the privacy policy for the autotoor mobile app by leveraging the ServeStaticModule.  The ServeStaticModule allows static content to be served from the file system ([see docs here](https://docs.nestjs.com/recipes/serve-static)).  In a more complete production environment, we would most likely not serve static content from an API service and instead have a separate dedicated server.

The service leverages the environment variable `STATIC_CONTENT_PATH` to locate the root directory on the local machine where the static content can be found.  The Dockerfile sets this env var to point at the static directory located in this tour-service directory.

The static content is then served under the `/static` path.
