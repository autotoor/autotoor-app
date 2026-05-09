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

### Running the mobile app during local development

Expo SDK 55 may require a newer native runtime than the public App Store version of Expo Go provides. For local phone testing, use the development build profile. It installs as `autotoor-dev` with the bundle identifier `com.autotoor.tourapp.dev`, so it can live beside the production AutoToor app.

1. Build and install the development client with EAS: `APP_VARIANT=development eas build --profile development --platform ios`
2. Start the tour service locally: `pnpm dev:tour`
3. Start Metro for the development client: `pnpm --filter @autotoor/app-mobile dev:client`
4. Open `autotoor-dev` on the phone and connect it to the Metro URL shown in the terminal.

Pure JavaScript and TypeScript changes reload from Metro. Rebuild the development client after changing Expo SDK versions, React Native versions, native dependencies, native permissions, bundle identifiers, or config plugins.

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
- [`packages/ui-common`](./packages/ui-common) - Shared React UI components for apps, using the `eslint-config` package.

## Tour Service Docker Build

- [`apps/tour-service/docker/Dockerfile`](./apps/tour-service/docker/Dockerfile) - The production dockerfile for deploying the tour-service as a docker container in the cloud provider of your choosing.  Runs on port specified by the PORT env var (default is 80 if not set).

To build the docker image
1. Make sure the app is built: `pnpm build`
2. Run the tour-service docker build command: `pnpm build:docker:tour`

### pnpm and Expo monorepos

This repo uses Expo SDK 55 and pnpm's default isolated dependency layout. Expo now supports pnpm monorepos without the older `node-linker=hoisted` workaround, so workspace packages should be declared with `workspace:*` and Metro should use Expo's default monorepo configuration.

The only custom Metro setting in this repository is [`config.cacheStores`](./apps/mobile/metro.config.js), which moves the Metro cache to a place Turborepo can restore.
