import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.abi.biblemaps',
  appName: 'Bible Maps',
  webDir: 'out',
  plugins: {
    App: {
    },
    Keyboard: {
      resize: 'native',
    },
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: false,
    appendUserAgent: 'BibleMapsApp',
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: false,
  },
};

export default config;