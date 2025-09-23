import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.abi.biblemaps',
  appName: 'Bible Maps',
  webDir: 'out',
  plugins: {      
    SplashScreen: {
      launchShowDuration: 1500, 
      launchAutoHide: false,   // we will hide manually in code
      androidSplashResourceName: 'splash', // your drawable name
      showSpinner: false,      // optional
      backgroundColor: '#1a1a1a', // colorBibleMapsDark
    },
    Keyboard: {
      resize: 'native',
    },
    StatusBar: {
      overlaysWebView: true   // ✅ makes content extend under transparent status bar
    }
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
