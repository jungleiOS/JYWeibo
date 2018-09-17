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
#import "SinaOriginResponse.h"

@implementation ThirdLoginModule
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getAuthWithUserInfoFromSina:(RCTResponseSenderBlock)block) {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootVC = (UIViewController *)[[[UIApplication sharedApplication] keyWindow] rootViewController];

    [[UMSocialManager defaultManager] getUserInfoWithPlatform:UMSocialPlatformType_Sina currentViewController:rootVC completion:^(id result, NSError *error) {
      if (error) {
        NSLog(@"error ---> %@",error);
      } else {
        NSDictionary *allInfo = [self informationProcessing:result];
        block(@[allInfo]);
      }
    }];
  });
}

- (NSDictionary *)informationProcessing:(id)originInfo {
  UMSocialUserInfoResponse *resp = originInfo;
  // 授权信息
//  NSLog(@"Sina uid: %@", resp.uid);
//  NSLog(@"Sina accessToken: %@", resp.accessToken);
//  NSLog(@"Sina refreshToken: %@", resp.refreshToken);
//  NSLog(@"Sina expiration: %@", resp.expiration);
  // 用户信息
//  NSLog(@"Sina name: %@", resp.name);
//  NSLog(@"Sina iconurl: %@", resp.iconurl);
//  NSLog(@"Sina gender: %@", resp.unionGender);
  // 第三方平台SDK源数据
//  NSLog(@"Sina originalResponse: %@", resp.originalResponse);
  NSDate *date = resp.expiration;
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  //设置格式：zzz表示时区
  [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss zzz"];
  NSString *expirationStr = [dateFormatter stringFromDate:date];
  SinaOriginResponse *sinaOriginResponse = [SinaOriginResponse mj_objectWithKeyValues:resp.originalResponse];
  NSDictionary *jsonDic = @{
                            @"uid"              : resp.uid,
                            @"accessToken"      : resp.accessToken,
                            @"refreshToken"     : resp.refreshToken,
                            @"expiration"       : expirationStr,
                            @"name"             : resp.name,
                            @"iconurl"          : resp.iconurl,
                            @"gender"           : resp.gender,
                            };
  NSError *parseError = nil;
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:&parseError];
  NSData *detailedJSONData = [NSJSONSerialization dataWithJSONObject:sinaOriginResponse.mj_keyValues options:NSJSONWritingPrettyPrinted error:&parseError];
  NSString *baseJSONStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  NSString *detailedJSONStr = [[NSString alloc] initWithData:detailedJSONData encoding:NSUTF8StringEncoding];
  NSDictionary *dic = @{
                        @"baseJSONStr":baseJSONStr,
                        @"detailedJSONStr":detailedJSONStr
                        };
  return dic;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"cur"];
}



@end
