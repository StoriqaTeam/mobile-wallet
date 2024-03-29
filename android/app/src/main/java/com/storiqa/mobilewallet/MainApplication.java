package com.storiqa.mobilewallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.peel.react.rnos.RNOSModule;
import com.BV.LinearGradient.LinearGradientPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.tectiv3.aes.RCTAesPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

// import com.friendster.BuildConfig;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new UdpSocketsModule(),
            new TcpSocketsModule(),
            new RNOSModule(),
            new LinearGradientPackage(),
            new RandomBytesPackage(),
            new RCTAesPackage(), // tested successfull
            new RNSecureKeyStorePackage(), // tested successfull
            new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
