//
//  ThirdLoginModule.m
//  JYWeibo
//
//  Created by HFY on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ThirdLoginModule.h"
#import <React/RCTBridgeModule.h>
#import <UMShare/UMShare.h>

@implementation ThirdLoginModule
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getAuthWithUserInfoFromSina) {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootVC = (UIViewController *)[[[UIApplication sharedApplication] keyWindow] rootViewController];

    [[UMSocialManager defaultManager] getUserInfoWithPlatform:UMSocialPlatformType_Sina currentViewController:rootVC completion:^(id result, NSError *error) {
      if (error) {
        NSLog(@"error ---> %@",error);
      } else {
        UMSocialUserInfoResponse *resp = result;
        // 授权信息
        NSLog(@"Sina uid: %@", resp.uid);
        NSLog(@"Sina accessToken: %@", resp.accessToken);
        NSLog(@"Sina refreshToken: %@", resp.refreshToken);
        NSLog(@"Sina expiration: %@", resp.expiration);
        // 用户信息
        NSLog(@"Sina name: %@", resp.name);
        NSLog(@"Sina iconurl: %@", resp.iconurl);
        NSLog(@"Sina gender: %@", resp.unionGender);
        // 第三方平台SDK源数据
        NSLog(@"Sina originalResponse: %@", resp.originalResponse);
      }
    }];
  });
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"cur"];
}

@end
