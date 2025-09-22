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
        int statusColor = getResources().getColor(R.color.colorBibleMapsDark);
        window.setStatusBarColor(statusColor);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                controller.setSystemBarsAppearance(
                    0, // clear APPEARANCE_LIGHT_STATUS_BARS
                    WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                );
            }
        }
    }
}