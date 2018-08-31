package com.jyweibo;

import android.app.Activity;
import android.bluetooth.BluetoothClass;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.app.Activity.RESULT_OK;

public class AddressBookModule extends ReactContextBaseJavaModule {
    ReactApplicationContext aContext;
    Promise currentPromise;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if ( requestCode != 1 || resultCode != RESULT_OK ) return;
            WritableMap toRN_Map = getContactInfo();
            sendMessage(toRN_Map);
        }
    };

    //监听Android生命周期
    private final LifecycleEventListener lifecycleEventListener = new LifecycleEventListener() {
        @Override
        public void onHostResume() {

        }

        @Override
        public void onHostPause() {

        }

        @Override
        public void onHostDestroy() {

        }
    };

    public void sendMessage(WritableMap toRNMessage) {
        aContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("contactInfo",toRNMessage);
    }

    private WritableMap getContactInfo() {
        WritableMap contactMap = Arguments.createMap();
        contactMap.putString("name","android");
        contactMap.putString("phoneNumber","15520061222");
        return contactMap;
    }

    public AddressBookModule(ReactApplicationContext reactContext) {
        super(reactContext);
        aContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }
    @Override
    public String getName() {
        return "AddressBookModule";
    }
    @ReactMethod
    public void takeContact(String aMessage) {
        Log.i("RNMessage","received message from RN:"+aMessage);
//        Intent aIntent = new Intent( aContext, Main2Activity.class);
//        aIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        aContext.startActivity(aIntent);
        Intent aIntent = new Intent(Intent.ACTION_PICK);
        aIntent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        Bundle b = new Bundle();
        aContext.startActivityForResult(aIntent, 1, b);
    }
    @ReactMethod
    public void promiseMessage(String aRNMeassage, Promise aPromise) {
        //currentPromise 方便在其他函数调用
        currentPromise = aPromise;
        if (aRNMeassage != null && !aRNMeassage.equals("")) {
            currentPromise.resolve("android O啦");
        }
        else {
            currentPromise.reject("404","android GG啦");
        }
    }
}
