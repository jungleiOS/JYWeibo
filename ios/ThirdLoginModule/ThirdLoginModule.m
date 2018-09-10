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
#import <MJExtension.h>

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
        NSDate *date = resp.expiration;
        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
        //设置格式：zzz表示时区
        [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss zzz"];
        NSString *expirationStr = [dateFormatter stringFromDate:date];
        NSDictionary *dic = resp.mj_keyValues;
        NSString *str = [resp mj_JSONString];
        NSDictionary *jsonDic = @{
                                  @"uid"              : resp.uid,
                                  @"accessToken"      : resp.accessToken,
                                  @"refreshToken"     : resp.refreshToken,
                                  @"expiration"       : expirationStr,
                                  @"name"             : resp.name,
                                  @"iconurl"          : resp.iconurl,
                                  @"gender"           : resp.unionGender,
//                                  @"originalResponse" : resp.originalResponse
                                  };
        NSError *parseError = nil;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:&parseError];
        NSString *jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        NSLog(@"jsonStr ====> %@",jsonStr);
      }
    }];
  });
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"cur"];
}



@end
