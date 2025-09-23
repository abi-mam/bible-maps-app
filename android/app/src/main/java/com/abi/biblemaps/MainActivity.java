package com.abi.biblemaps;

import android.os.Bundle;
import android.os.Build;
import android.view.Window;
import android.view.WindowInsetsController;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();

        // Set status bar color
        int statusColor = getResources().getColor(R.color.colorBibleMapsDark);
        window.setStatusBarColor(statusColor);

        // Set navigation bar color
        int navColor = getResources().getColor(R.color.colorBibleMapsLight);
        window.setNavigationBarColor(navColor);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                // Clear light status bar icons (use dark icons on light background, or vice versa)
                controller.setSystemBarsAppearance(
                    0,
                    WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                );

                // Clear light navigation bar icons (same logic as above)
                controller.setSystemBarsAppearance(
                    0,
                    WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                );
            }
        }
    }
}