const config: CapacitorConfig = {
  appId: 'com.abi.biblemaps',
  appName: 'Bible Maps',
  webDir: 'out',
  plugins: {
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: '#ffffff',
      overlaysWebView: false,
    },
    App: {
      windowFlags: {
        android: [
          'FLAG_HIDE_NAVIGATION',
          'FLAG_IMMERSIVE_STICKY'
        ]
      }
    },
    Keyboard: {
      resize: 'none',
    }
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: false,
    appendUserAgent: 'BibleMapsApp',
    windowFlags: [
      'FLAG_HIDE_NAVIGATION',
      'FLAG_IMMERSIVE_STICKY'
    ]
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: false
  }
};
