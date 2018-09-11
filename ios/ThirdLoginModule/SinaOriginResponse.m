//
//  SinaOriginResponse.m
//  JYWeibo
//
//  Created by 塔米尔 on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "SinaOriginResponse.h"

@implementation Insecurity
@end


@implementation Visible
@end


@implementation Comment_manage_info
@end


@implementation Status
+ (NSDictionary *)mj_rereplacedKeyFromPropertyName {
  return @{
           @"user_id":@"id"
           };
}
@end


@implementation SinaOriginResponse
+ (NSDictionary *)mj_rereplacedKeyFromPropertyName {
  return @{
            @"sina_id":@"id",
            @"classify":@"class",
            @"sina_description":@"description"
           };
}
@end
