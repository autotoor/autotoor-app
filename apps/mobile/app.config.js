const isDevelopmentVariant = process.env.APP_VARIANT === 'development';

const appName = isDevelopmentVariant ? 'autotoor-dev' : 'autotoor';
const appIdentifier = isDevelopmentVariant ? 'com.autotoor.tourapp.dev' : 'com.autotoor.tourapp';
const appScheme = isDevelopmentVariant ? 'autotoor-dev' : 'autotoor';

module.exports = {
  expo: {
    name: appName,
    slug: 'tour-app',
    scheme: appScheme,
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon512.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: appIdentifier,
      buildNumber: '1.0.0',
      supportsTablet: true,
    },
    android: {
      package: appIdentifier,
      adaptiveIcon: {
        foregroundImage: './assets/icon512.png',
        backgroundColor: '#FFFFFF',
      },
      permissions: [
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.FOREGROUND_SERVICE',
      ],
    },
    plugins: [
      [
        'expo-location',
        {
          locationWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],
    ],
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      appVariant: isDevelopmentVariant ? 'development' : 'production',
      eas: {
        projectId: '1077a43d-9de8-4a5d-90da-c86d17463166',
      },
    },
  },
};
