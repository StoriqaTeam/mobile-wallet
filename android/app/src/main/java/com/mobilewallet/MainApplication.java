package com.mobilewallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.peel.react.rnos.RNOSModule;
import com.BV.LinearGradient.LinearGradientPackage;
import org.reactnative.camera.RNCameraPackage;
import com.tectiv3.aes.RCTAesPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.tectiv3.aes.RCTAesPackage;
import org.reactnative.camera.RNCameraPackage;
// import com.tectiv3.aes.RCTAesPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

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
            new LinearGradientPackage(),
            new RandomBytesPackage(),
            new UdpSocketsModule(),
            new TcpSocketsModule(),
            new RNSecureKeyStorePackage(),
            new RandomBytesPackage(),
            new RNOSModule(),
            new LinearGradientPackage(),
            new RNCameraPackage(),
            new RCTAesPackage(),
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
