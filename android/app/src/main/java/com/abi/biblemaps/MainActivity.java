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
    protected void onResume() {
        super.onResume();
        applySystemUI();
    }

    /**
     * Apply immersive nav bar and default status bar color
     */
    private void applySystemUI() {
        Window window = getWindow();

        // ✅ Hide navigation bar (immersive sticky)
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

        // ✅ Use Android resource color for status bar
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(getResources().getColor(R.color.colorBibleMapsDark));
        }

        // ✅ Light icons (white) by default
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int flags = window.getDecorView().getSystemUiVisibility();
            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            window.getDecorView().setSystemUiVisibility(flags);
        }
    }
}