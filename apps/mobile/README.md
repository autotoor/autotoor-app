# AutoToor mobile

This app uses Expo SDK 55. Expo Go may not support this SDK version on every device, so phone testing should use the development client build.

## App variants

The app identity is selected with `APP_VARIANT`.

| Variant | App name | Android package | iOS bundle id | Use |
| --- | --- | --- | --- | --- |
| `development` | `autotoor-dev` | `com.autotoor.tourapp.dev` | `com.autotoor.tourapp.dev` | Local testing with Metro |
| `production` | `autotoor` | `com.autotoor.tourapp` | `com.autotoor.tourapp` | Store builds |

The development app can be installed beside the production AutoToor app.

## Prerequisites

From the repo root:

```bash
nvm use
pnpm install
```

Install EAS CLI for the active Node version if `eas` is not found:

```bash
npm install -g eas-cli
eas login
```

## Build the Android development app

From this directory:

```bash
cd /Users/alexlevine/dev/autotoor-app/apps/mobile
nvm use
APP_VARIANT=development eas build --profile development --platform android
```

The `development` EAS profile creates an APK and enables the Expo development client launcher.

When the EAS build finishes:

1. Open the EAS build URL on the Android phone, or scan the EAS build QR code.
2. Download and install the APK.
3. If Android asks, allow APK installs from the browser.
4. Confirm that a separate app named `autotoor-dev` is installed.

If Android refuses to update the APK, uninstall only `autotoor-dev` and install the new APK again. The production app uses a different package id and does not need to be removed.

## Test the development app locally

Start the backend from the repo root:

```bash
cd /Users/alexlevine/dev/autotoor-app
nvm use
pnpm dev:tour
```

Start Metro for the development client from this directory:

```bash
cd /Users/alexlevine/dev/autotoor-app/apps/mobile
nvm use
pnpm dev:client:local -- --clear
```

Open `autotoor-dev` on the phone and connect to the Metro URL shown in the terminal, usually:

```text
exp://<your-laptop-lan-ip>:8081
```

The current local helper script sets the backend URL to:

```text
http://192.168.68.68:3333
```

If your laptop IP changes, update `dev:client:local` in `package.json` or run Metro with an explicit URL:

```bash
APP_VARIANT=development EXPO_PUBLIC_AUTOTOOR_API_BASE_URL=http://<your-laptop-lan-ip>:3333 expo start --dev-client --host lan --clear
```

## When to rebuild the APK

You do not need to rebuild the APK for normal JavaScript, TypeScript, styling, or API changes. Reload the app from Metro.

Rebuild and reinstall `autotoor-dev` after changing:

- Expo SDK version
- React Native version
- Native dependencies
- Native permissions
- Android package or iOS bundle id
- Expo config plugins
- Any other native app configuration

## Production builds

Production builds resolve to `com.autotoor.tourapp`.

Android store build:

```bash
APP_VARIANT=production eas build --profile production --platform android
```

iOS store build:

```bash
APP_VARIANT=production eas build --profile production --platform ios
```

The Android production profile builds an `.aab` app bundle for Play Console. EAS uses remote app versioning and `android.autoIncrement`, so each Android production build increments the Play Store `versionCode` automatically. This is required before uploading another build to any Play Console track.

## Publish an Android test build

Build a fresh production Android bundle from this directory:

```bash
cd /Users/alexlevine/dev/autotoor-app/apps/mobile
nvm use
APP_VARIANT=production eas build --profile production --platform android --wait
```

When the build finishes, download the `.aab` artifact from the EAS build URL. Rename it with the app version and versionCode if you want a clearer local filename, for example:

```text
autotoor-production-1.0.0-versionCode5.aab
```

Upload that `.aab` in Play Console to the desired testing track, such as Internal testing or Closed testing. If Play Console blocks the upload for a policy declaration, complete the required App content form first, then upload the same `.aab` again.

## Submit to Play Console with EAS

The production submit profile targets the production track as a draft release:

```bash
APP_VARIANT=production eas build --profile production --platform android --auto-submit --wait
```

To submit an already-built Android artifact by build id:

```bash
eas submit --platform android --id <eas-build-id> --profile production --wait
```

EAS submit requires a Google Play service account with access to `com.autotoor.tourapp`. The service account must have Play Console permissions for releases on the target app. Google Cloud IAM access alone is not enough.

## Useful local commands

```bash
pnpm lint
pnpm test
pnpm build
pnpm web
```

`pnpm web` runs the Expo web version on localhost.

## Troubleshooting

If the phone says no apps are connected when pressing `r` or `m` in the Metro terminal, open `autotoor-dev` and connect it to the `exp://...:8081` URL from that terminal.

If `autotoor-dev` opens straight into the app instead of showing the development client launcher, rebuild the APK with the `development` EAS profile. That profile must include `"developmentClient": true`.

If the app cannot reach the backend for 30 seconds, it shows a dialog with the API URL it tried. Dismissing the dialog retries the request.

If image requests fail on Android, check the Metro or Android logs for the image URL and HTTP response code.
