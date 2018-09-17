package com.jyweibo;

import android.app.Activity;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
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

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;


public class ThirdLoginModule extends ReactContextBaseJavaModule {

    ReactApplicationContext aContext;
    Callback callback;
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

            Map<String, String> baseJsonMap=new HashMap<String, String>();
            baseJsonMap.put("uid",data.get("uid"));
            baseJsonMap.put("accessToken",data.get("access_token"));
            baseJsonMap.put("refreshToken",data.get("refreshToken"));
            baseJsonMap.put("expiration",data.get("expiration"));
            baseJsonMap.put("name",data.get("name"));
            baseJsonMap.put("iconurl",data.get("iconurl"));
            baseJsonMap.put("gender",data.get("gender"));

            Gson gsonObj = new Gson();
            String baseJsonStr = gsonObj.toJson(baseJsonMap);
            String detailedJsonStr = gsonObj.toJson(data);
            WritableMap contactMap = Arguments.createMap();

            contactMap.putString("baseJSONStr",baseJsonStr);
            contactMap.putString("detailedJSONStr",detailedJsonStr);

            callback.invoke(contactMap);
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
    public void getAuthWithUserInfoFromSina(Callback theCallback) {
        Activity activity = getCurrentActivity();
        UMShareAPI.get(aContext).getPlatformInfo(activity, SHARE_MEDIA.SINA, umAuthListener);
        callback = theCallback;
    }

}
