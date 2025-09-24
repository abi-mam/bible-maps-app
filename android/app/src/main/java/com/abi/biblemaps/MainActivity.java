package com.abi.biblemaps;
import android.content.res.TypedArray;
import android.graphics.Color;
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
        
        // Adaptive status bar icons based on app background color
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            boolean backgroundIsLight = isBackgroundLight();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                WindowInsetsController controller = window.getInsetsController();
                if (controller != null) {
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
            } else {
                // For API 23-29
                int flags = window.getDecorView().getSystemUiVisibility();
                if (backgroundIsLight) {
                    flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR; // dark icons
                } else {
                    flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR; // white icons
                }
                window.getDecorView().setSystemUiVisibility(flags);
            }
        }
    }
    
    private boolean isBackgroundLight() {
        try {
            // Get the status bar color from current theme
            TypedArray array = getTheme().obtainStyledAttributes(new int[]{android.R.attr.statusBarColor});
            int statusBarColor = array.getColor(0, Color.BLACK);
            array.recycle();
            
            // Calculate luminance to determine if background is light
            int red = Color.red(statusBarColor);
            int green = Color.green(statusBarColor);
            int blue = Color.blue(statusBarColor);
            
            // Using relative luminance formula
            double luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
            
            // If luminance > 0.5, it's a light color, use dark icons
            return luminance > 0.5;
            
        } catch (Exception e) {
            // Fallback: assume light background for most app screens
            return true;
        }
    }
}