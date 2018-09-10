/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UMShare/UMShare.h>

NSString * const SinaKey = @"3414425297";
NSString * const SinaSecret = @"fc2b4e5cf093bc02c9fac20583dbdd0e";
NSString * const UMKey = @"5b9609158f4a9d7b83000028";

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"JYWeibo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [self configUSharePlatforms];
  [self confitUShareSettings];
  
  return YES;
}

- (void)configUSharePlatforms {
  UMSocialManager *socialManager = [UMSocialManager defaultManager];
  socialManager.umSocialAppkey = UMKey;
  [socialManager openLog:NO];
  [socialManager setPlaform:UMSocialPlatformType_Sina appKey:SinaKey appSecret:SinaSecret redirectURL:@"https://www.jianshu.com/"];
}

- (void)confitUShareSettings {
  
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  NSLog(@" annotation --->%@",annotation);
  return result;
}

@end
