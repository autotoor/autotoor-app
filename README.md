This Repo was initially forked from this repo: https://github.com/byCedric/expo-monorepo-example

To run the repository locally, run these two commands:

- `$ pnpm install` - This installs all required Node libraries using [pnpm](https://pnpm.io/).
- `$ pnpm dev` - Starts the development servers for all **apps**.

### Commands

Because this monorepo uses [Turborepo](https://turbo.build/repo), you don't need to run additional commands to set things up. Whenever you run `$ pnpm build`, it will build all **packages** if they aren't built yet. In this monorepo we use a few commands or pipelines:

- `$ pnpm dev` - Build and watch all **apps** and **packages** for development.
- `$ pnpm lint` - Analyze the source code of all **apps** and **packages** using ESLint.
- `$ pnpm test` - Run all tests for packages with Jest tests.
- `$ pnpm build` - Build all **apps** and **packages** for production or to publish them on npm.

When developing or deploying a single app, you might not need the development server for all apps. For example, if you need to make a fix in the mobile app, you don't need the web development server. Or when deploying a single app to production, you only need to build that single app with all dependencies.

This monorepo uses a simple npm script convention of `dev:<app-name>` and `build:<app-name>` to keep this process simple. Under the hood, it uses [Turborepo's workspace filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering), defined as an npm script in the root [**package.json**](./package.json).

- `$ pnpm dev:mobile` - Build and watch **app/mobile** and all **packages** used in mobile, for development.
- `$ pnpm dev:tour` - Build and watch **app/tour-service** and all **packages** used in tour-service, for development.
- `$ pnpm build:mobile` - Build **apps/mobile** and all **packages** used in mobile, for production deployments
- `$ pnpm build:tour` - Build **apps/tour-service** and all **packages** used in tour-service, for production deployments

### Running the mobile app during local development using Expo Go
1. Get the IP address of your local machine on the current network.  If you are on a mac, you can get this using the command: `echo $(ifconfig | awk '/inet /&&!/127.0.0.1/{print $2;exit}')`
2. Ensure that all the services are up in running in development mode by running: `pnpm dev`
3. Install the Expo Go app on your phone. You should be able to get it from the app store.
4. In the Expo Go app, find the option to enter the url manually and set it to be: `exp://[IP_FROM_STEP_1]:8081` where `IP_FROM_STEP_1` is the IP Address from step 1.  For example if it returned `10.0.0.3` then the manual url should be `exp://10.0.0.3:8081`.  This should then open the app.

## 📁 Structure

- [`apps`](./apps) - Apps that only use packages and aren't aware of other apps.
- [`packages`](./packages) - Packages that may use external and/or other monorepo packages.

### Apps

- [`apps/mobile`](./apps/mobile) - Expo app using `eslint-config` and `feature-home` packages.
- [`apps/tour-service`](./apps/tour-service) - NestJS app using `eslint-config-backend` and `tour-common` packages.

### Packages

- [`packages/eslint-config`](./packages/eslint-config) - Preconfigured ESLint configuration geared towards frontend for apps or packages.
- [`packages/eslint-config-backend`](./packages/eslint-config-backend) - Preconfigured ESLint configuration geared towards nestJS for each app or package.
- [`packages/tour-common`](./packages/tour-common) - Shared tour types for both FE and BE. Uses the `eslint-config-backend` package
- [`packages/ui`](./packages/ui) - Shared React Native UI components for apps, using the `eslint-config` package.

## Tour Service Docker Build

- [`apps/tour-service/docker/Dockerfile`](./apps/tour-service/docker/Dockerfile) - The production dockerfile for deploying the tour-service as a docker container in the cloud provider of your choosing.  Runs on port specified by the PORT env var (default is 80 if not set).

To build the docker image
1. Make sure the app is built: `pnpm build`
2. Run the tour-service docker build command: `pnpm build:docker:tour`


## ⚠️ Caveats

### Using environment variables in React Native

Reusing Metro caches can be dangerous if you use Babel plugins like [transform-inline-environment-variables](https://babeljs.io/docs/en/babel-plugin-transform-inline-environment-variables/). When using Babel plugins to swap out environment variables for their actual value, you are creating a dependency on environment variables. Because Metro is unaware of dependencies on environment variables, Metro might reuse an incorrect cached environment variable.

Since Turborepo handles the cache in this repository, we can leverage [caching based on environment variables](https://turbo.build/repo/docs/core-concepts/caching#altering-caching-based-on-environment-variables). This invalidates the Metro cache whenever certain environment variables are changed and avoid reusing incorrect cached code.

### pnpm workarounds

In the current React Native ecosystem, there are a lot of implicit dependencies. These can be from the native code that is shipped within packages, or even implicit dependencies through installing a specific version of Expo or React Native. In the newer package managers like pnpm, you will run into issues due to these implicit dependencies. Besides that there are other issues like [Metro not following symlinks](https://github.com/facebook/metro/issues/1).

To workaround these issues, we have to change some config:

1. Let pnpm generate a flat **node_modules** folder, without symlinks. You can do that by creating a root [**.npmrc**](./.npmrc) file containing ([`node-linker=hoisted`](https://pnpm.io/npmrc#node-linker)). This works around two things; no Metro symlink support, and having a simple way to determine where the modules are installed (see point 3).

2. Either disable [`strict-peer-dependencies`](https://pnpm.io/npmrc#strict-peer-dependencies) or add [`peerDependencyRules.ignoreMissing`](./package.json#L14-L22) rules in the **package.json**. This disables some of the expected implicit peer dependencies issues. Without these changes, pnpm will fail on install asking you to install various peer dependencies.

3. Update the **metro.config.js** configuration for usage in monorepos. Full explanation per configuration option can be found in the [Expo docs](https://docs.expo.dev/guides/monorepos/#modify-the-metro-config). The only addition in this repository is the [`config.cacheStores`](./apps/mobile/metro.config.js#L22-L24). This change moves the Metro cache to a place which is accessible by Turborepo, our main cache handler (see [Why is it fast?](#-why-is-it-fast)).
