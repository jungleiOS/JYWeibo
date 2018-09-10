//
//  SinaOriginResponse.h
//  JYWeibo
//
//  Created by 塔米尔 on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SinaOriginResponse : NSObject
@property (nonatomic, copy) NSString *cover_image_phone;
@property (nonatomic, assign) long sinaID; //
@property (nonatomic, assign) long bi_followers_count;
@property (nonatomic, assign) long urank;
@property (nonatomic, copy) NSString *profile_image_url;
@property (nonatomic, assign) long classfiy;//
@property (nonatomic, copy) NSString *like;
@property (nonatomic, copy) NSString *province;
@property (nonatomic, assign) long video_status_count;
@property (nonatomic, copy) NSString *verified;
@property (nonatomic, copy) NSString *url;
@property (nonatomic, assign) long statuses_count;
@property (nonatomic, copy) NSString *geo_enabled;
@property (nonatomic, copy) NSString *follow_me;
@property (nonatomic, copy) NSString *userDescription;//
@property (nonatomic, assign) long followers_count;
@property (nonatomic, copy) NSString *location;
@property (nonatomic, assign) long mbrank;
@property (nonatomic, copy) NSString *avatar_large;
@property (nonatomic, assign) long star;
@property (nonatomic, copy) NSString *verified_trade;
@property (nonatomic, copy) NSString *profile_url;
@property (nonatomic, copy) NSString *weihao;
@property (nonatomic, assign) long online_status;
@property (nonatomic, copy) NSString *screen_name;
@property (nonatomic, copy) NSString *verified_source_url;
@property (nonatomic, assign) long pagefriends_count;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *verified_reason;
@property (nonatomic, assign) long friends_count;
@property (nonatomic, assign) BOOL insecurity; //
@property (nonatomic, assign) long vclub_member;
@property (nonatomic, assign) long mbtype;
@property (nonatomic, assign) long block_app;
@property (nonatomic, assign) long story_read_state;
@property (nonatomic, copy) NSString *avatar_hd;
@property (nonatomic, assign) long credit_score;
@property (nonatomic, copy) NSString *remark;
@property (nonatomic, strong) NSDate *created_at;
@property (nonatomic, assign) long block_word;
@property (nonatomic, copy) NSString *allow_all_act_msg;
@property (nonatomic, copy) NSString *domain;
@property (nonatomic, copy) NSString *like_me;
@property (nonatomic, copy) NSString *allow_all_comment;
@property (nonatomic, copy) NSString *verified_reason_url;
@property (nonatomic, copy) NSString *gender;
@property (nonatomic, copy) NSString *idstr;
@property (nonatomic, copy) NSString *verified_source;
@property (nonatomic, copy) NSString *following;
@property (nonatomic, assign) long favourites_count;
@property (nonatomic, assign) long verified_type;
@property (nonatomic, assign) long city;
@property (nonatomic, assign) long user_ability;
@property (nonatomic, assign) long lang;
@property (nonatomic, assign) long ptype;
@end
