package com.jyweibo;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.UMAuthListener;

import java.util.Map;

public class ThirdLoginModule extends ReactContextBaseJavaModule {

    ReactApplicationContext aContext;
    UMShareAPI umShareAPI;
    UMAuthListener umAuthListener = new UMAuthListener() {
        /**
         * @desc 授权开始的回调
         * @param platform 平台名称
         */
        @Override
        public void onStart(SHARE_MEDIA platform) {

        }

        /**
         * @desc 授权成功的回调
         * @param platform 平台名称
         * @param action 行为序号，开发者用不上
         * @param data 用户资料返回
         */
        @Override
        public void onComplete(SHARE_MEDIA platform, int action, Map<String, String> data) {

            Toast.makeText(aContext, "成功了", Toast.LENGTH_LONG).show();

        }

        /**
         * @desc 授权失败的回调
         * @param platform 平台名称
         * @param action 行为序号，开发者用不上
         * @param t 错误原因
         */
        @Override
        public void onError(SHARE_MEDIA platform, int action, Throwable t) {

            Toast.makeText(aContext, "失败：" + t.getMessage(), Toast.LENGTH_LONG).show();
        }

        /**
         * @desc 授权取消的回调
         * @param platform 平台名称
         * @param action 行为序号，开发者用不上
         */
        @Override
        public void onCancel(SHARE_MEDIA platform, int action) {
            Toast.makeText(aContext, "取消了", Toast.LENGTH_LONG).show();
        }
    };
    MainApplication application;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            UMShareAPI.get(aContext).onActivityResult(requestCode, resultCode, data);
        }
    };

    public ThirdLoginModule(ReactApplicationContext context) {
        super(context);
        aContext = context;
        context.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName(){
        return "ThirdLoginModule";
    }

    @ReactMethod
    public void getAuthWithUserInfoFromSina(Callback callback) {
        Log.i("RN","23333");
        umShareAPI.getPlatformInfo(, SHARE_MEDIA.SINA, umAuthListener);
        WritableMap contactMap = Arguments.createMap();
        contactMap.putString("name","android");
        contactMap.putString("phoneNumber","15520061222");
        callback.invoke(contactMap);
    }

}
