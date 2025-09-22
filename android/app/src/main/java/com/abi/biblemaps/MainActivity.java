package com.abi.biblemaps;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Manually register the Immersive plugin
        registerPlugin(ImmersivePlugin.class);
    }
}
