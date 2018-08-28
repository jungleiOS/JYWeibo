//
//  AddressBookModule.m
//  JYWeibo
//
//  Created by HFY on 2018/8/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AddressBookModule.h"
#import <React/RCTBridgeModule.h>
#import "CallAdressbookViewController.h"
static NSString * const kEventName = @"contactInfo";
@interface AddressBookModule () <RCTBridgeModule> {
  RCTPromiseResolveBlock _resolveBlock;
  RCTPromiseRejectBlock _rejectBlock;
}
@end

@implementation AddressBookModule

- (NSArray<NSString *> *)supportedEvents {
  return @[kEventName];
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(takeContact:(NSString *)msg) {
  NSLog(@"----> %@",msg);
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootVC = (UIViewController *)[[[UIApplication sharedApplication] keyWindow] rootViewController];
    CallAdressbookViewController *addressBookVC = [[CallAdressbookViewController alloc] init];
    [rootVC presentViewController:addressBookVC animated:YES completion:^{
      [self sendAllMessage];
    }];
  });
  
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:@"Num" object:nil];
}

- (void)sendAllMessage {
  NSDictionary *contactDic = @{@"name":@"大帅",@"phoneNumber":@"13223204110"};
  [self sendEventWithName:kEventName body:contactDic];
}

- (void)calendarEventReminderReceived:(NSNotification *)notification {
  if ( notification.object == nil ) return;
  NSString *phoneNumber = notification.object;
  NSString *contactName = notification.userInfo[@"name"];
  phoneNumber = [phoneNumber stringByReplacingOccurrencesOfString:@"-" withString:@""];
  phoneNumber = [phoneNumber stringByReplacingOccurrencesOfString:@"(" withString:@""];
  phoneNumber = [phoneNumber stringByReplacingOccurrencesOfString:@")" withString:@""];
  phoneNumber = [phoneNumber stringByReplacingOccurrencesOfString:@" " withString:@""];
  NSDictionary *contactDic = @{@"name":contactName,@"phoneNumber":phoneNumber};
  [self sendEventWithName:kEventName body:contactDic];
  [self sendPromiseMessage:@"promiseMessage"];
}

RCT_EXPORT_METHOD(removeListener:(RCTResponseSenderBlock)callback) {
  [[NSNotificationCenter defaultCenter] removeObserver:self name:@"Num" object:nil];
  callback(@[@"true"]);
}

RCT_EXPORT_METHOD(promiseMessage:(NSString *)msg
                        resolver:(RCTPromiseResolveBlock)resolve
                        rejecter:(RCTPromiseRejectBlock)reject
                  ) {
  NSLog(@"---> %@",msg);
  _resolveBlock = resolve;
  _rejectBlock = reject;
  [self sendPromiseMessage:@"promiseMessage"];
}

- (void)sendPromiseMessage:(NSString *)msg {
  if (msg && ![msg  isEqual: @""] && msg.length > 0) {
    _resolveBlock(@"msg");
  }
  else {
    _rejectBlock(@"404",@"测试错误",nil);
  }
}

@end
