// If you need to register additional plugins:
import com.getcapacitor.community.statusbar.StatusBar;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Add any plugins that aren't auto-registered
        registerPlugin(StatusBar.class);
    }
}