package com.abi.biblemaps;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        // Manually register Immersive plugin so it's always available
        this.bridge.getPluginManager().add(ImmersivePlugin.class);
    }
}