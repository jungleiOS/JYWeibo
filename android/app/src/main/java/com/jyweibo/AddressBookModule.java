package com.jyweibo;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AddressBookModule extends ReactContextBaseJavaModule {
    ReactApplicationContext aContext;
    public AddressBookModule(ReactApplicationContext reactContext) {
        super(reactContext);
        aContext = reactContext;
    }
    @Override
    public String getName() {
        return "AddressBookModule";
    }
    @ReactMethod
    public void takeContact(String aMessage) {
        Log.i("RNMessage","received message from RN:"+aMessage);
        Intent aIntent = new Intent( aContext, Main2Activity.class);
        aIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        aContext.startActivity(aIntent);
    }

}
