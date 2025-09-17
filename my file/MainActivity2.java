package com.abi.biblemaps;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Set up system UI flags for navigation bar always hidden
        setupSystemUI();

        webView = findViewById(R.id.webview);
        webView.addJavascriptInterface(new WebAppInterface(), "Android");
        
        // Configure WebView
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        
        webView.setWebViewClient(new WebViewClient());
        
        // Load your app - adjust this URL to match your setup
        webView.loadUrl("file:///android_asset/public/index.html");
    }

    private void setupSystemUI() {
        // Always hide navigation bar, show status bar by default
        View decorView = getWindow().getDecorView();
        int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
        decorView.setSystemUiVisibility(uiOptions);

        // Set status bar color to white for non-map screens
        getWindow().setStatusBarColor(Color.WHITE);
        
        // Make status bar icons dark
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            decorView.setSystemUiVisibility(uiOptions | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }
    }

    public class WebAppInterface {
        @JavascriptInterface
        public void setMapViewerMode() {
            runOnUiThread(() -> {
                // Hide status bar and make it transparent for map viewer
                getWindow().setStatusBarColor(Color.TRANSPARENT);
                View decorView = getWindow().getDecorView();
                int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
                decorView.setSystemUiVisibility(uiOptions);
            });
        }

        @JavascriptInterface
        public void setNormalMode() {
            runOnUiThread(() -> {
                // Show status bar with white background for other screens
                getWindow().setStatusBarColor(Color.WHITE);
                View decorView = getWindow().getDecorView();
                int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
                
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    uiOptions |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                }
                
                decorView.setSystemUiVisibility(uiOptions);
            });
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}