package com.jyweibo;

import android.app.Activity;
import android.app.Application;
import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  public Activity mCurrentActivity;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new AddressBookModulePackage(),
              new ThirdLoginModulePackage()
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
    UMConfigure.init(this,"5b974b458f4a9d622c000173"
            ,"umeng",UMConfigure.DEVICE_TYPE_PHONE,"");
    UMConfigure.setLogEnabled(true);
  }
  {
    PlatformConfig.setSinaWeibo("3414425297", "fc2b4e5cf093bc02c9fac20583dbdd0e","https://www.jianshu.com/");
  }

}
