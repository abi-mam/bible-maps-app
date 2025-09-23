package com.abi.biblemaps;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applySystemUI();
    }

    @Override
    public void onResume() {  // must be public to override BridgeActivity
        super.onResume();
        applySystemUI();
    }

    /**
     * Apply immersive nav bar and transparent status bar with adaptive icons
     */
    private void applySystemUI() {
        Window window = getWindow();

        // Hide navigation bar (immersive sticky)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.navigationBars());
                controller.setSystemBarsBehavior(
                        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
        } else {
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            );
        }

        // Make status bar transparent and allow content behind it
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(android.graphics.Color.TRANSPARENT);
            int flags = window.getDecorView().getSystemUiVisibility();
            flags |= View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
            window.getDecorView().setSystemUiVisibility(flags);
        }

        // Adaptive status bar icons (light/dark) depending on background
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int flags = window.getDecorView().getSystemUiVisibility();

            // Detect background brightness and set icon color
            // Example: you can decide dynamically; here we set dark icons for light backgrounds
            boolean useDarkIcons = false; // change based on your background color logic
            if (useDarkIcons) {
                flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR; // dark icons
            } else {
                flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR; // light icons
            }

            window.getDecorView().setSystemUiVisibility(flags);
        }
    }
}
