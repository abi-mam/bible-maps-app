package com.abi.biblemaps;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowInsetsController;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applySystemUI();
        
        // --- Disable WebView long press / selection ---
        WebView webView = (WebView) this.bridge.getWebView();
        // Consume long press
        webView.setOnLongClickListener(v -> true);
        webView.setHapticFeedbackEnabled(false);
        webView.setLongClickable(false);
        
        // Remove the problematic line - setTextSelectionEnabled() doesn't exist
        // The above methods already handle disabling text selection effectively
    }
    
    @Override
    public void onResume() {
        super.onResume();
        applySystemUI();
    }
    
    private void applySystemUI() {
        Window window = getWindow();
        // Transparent status bar
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(android.graphics.Color.TRANSPARENT);
            int flags = window.getDecorView().getSystemUiVisibility();
            flags |= View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
            window.getDecorView().setSystemUiVisibility(flags);
        }
        
        // Hide navigation bar (immersive sticky)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                controller.hide(android.view.WindowInsets.Type.navigationBars());
                controller.setSystemBarsBehavior(
                        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
        } else {
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            );
        }
        
        // Adaptive status bar icons
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                boolean backgroundIsLight = isBackgroundLight();
                if (backgroundIsLight) {
                    controller.setSystemBarsAppearance(
                            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS,
                            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    ); // dark icons
                } else {
                    controller.setSystemBarsAppearance(
                            0,
                            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    ); // white icons
                }
            }
        }
    }
    
}