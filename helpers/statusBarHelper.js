import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Opaque status bar (normal screens)
 */
export function setOpaqueStatusBar() {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setBackgroundColor({ color: '#006400' }); // dark green
  StatusBar.setStyle({ style: Style.Light }); // white icons
}

/**
 * Transparent status bar (map viewer)
 */
export function setTransparentStatusBar(theme = "light") {
  StatusBar.setOverlaysWebView({ overlay: true });
  StatusBar.setBackgroundColor({ color: '#00000000' }); // fully transparent
  StatusBar.setStyle({
    style: theme === "light" ? Style.Dark : Style.Light
  });
}
