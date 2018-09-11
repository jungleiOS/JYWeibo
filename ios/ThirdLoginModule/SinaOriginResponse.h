//
//  SinaOriginResponse.h
//  JYWeibo
//
//  Created by 塔米尔 on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Insecurity :NSObject

@property (nonatomic , assign) BOOL              sexual_content;

@end


@interface Visible :NSObject

@property (nonatomic , assign) NSInteger              type;
@property (nonatomic , assign) NSInteger              list_id;

@end


@interface Comment_manage_info :NSObject

@property (nonatomic , assign) NSInteger              comment_permission_type;
@property (nonatomic , assign) NSInteger              approval_comment_type;

@end
  
  
@interface Status :NSObject
@property (nonatomic , copy) NSString              * created_at;
@property (nonatomic , assign) NSInteger              user_id; //
@property (nonatomic , copy) NSString              * idstr;
@property (nonatomic , copy) NSString              * mid;
@property (nonatomic , assign) BOOL              can_edit;
@property (nonatomic , copy) NSString              * text;
@property (nonatomic , assign) NSInteger              textLength;
@property (nonatomic , assign) NSInteger              source_allowclick;
@property (nonatomic , assign) NSInteger              source_type;
@property (nonatomic , copy) NSString              * source;
@property (nonatomic , assign) BOOL              favorited;
@property (nonatomic , assign) BOOL              truncated;
@property (nonatomic , copy) NSString              * in_reply_to_status_id;
@property (nonatomic , copy) NSString              * in_reply_to_user_id;
@property (nonatomic , copy) NSString              * in_reply_to_screen_name;
@property (nonatomic , assign) BOOL              is_paid;
@property (nonatomic , assign) NSInteger              mblog_vip_type;
@property (nonatomic , assign) NSInteger              reposts_count;
@property (nonatomic , assign) NSInteger              comments_count;
@property (nonatomic , assign) NSInteger              attitudes_count;
@property (nonatomic , assign) NSInteger              pending_approval_count;
@property (nonatomic , assign) BOOL              isLongText;
@property (nonatomic , assign) NSInteger              hide_flag;
@property (nonatomic , assign) NSInteger              mlevel;
@property (nonatomic , strong) Visible              * visible;
@property (nonatomic , strong) NSArray <NSNumber *>              * biz_ids;
@property (nonatomic , assign) NSInteger              biz_feature;
@property (nonatomic , assign) NSInteger              page_type;
@property (nonatomic , assign) NSInteger              hasActionTypeCard;
@property (nonatomic , strong) NSArray <NSNumber *>              * darwin_tags;
@property (nonatomic , strong) NSArray <NSNumber *>              * hot_weibo_tags;
@property (nonatomic , strong) NSArray <NSNumber *>              * text_tag_tips;
@property (nonatomic , assign) NSInteger              mblogtype;
@property (nonatomic , copy) NSString              * rid;
@property (nonatomic , assign) NSInteger              userType;
@property (nonatomic , assign) NSInteger              more_info_type;
@property (nonatomic , assign) NSInteger              positive_recom_flag;
@property (nonatomic , assign) NSInteger              content_auth;
@property (nonatomic , copy) NSString              * gif_ids;
@property (nonatomic , assign) NSInteger              is_show_bulletin;
@property (nonatomic , strong) Comment_manage_info              * comment_manage_info;

@end
  
  
@interface SinaOriginResponse :NSObject
@property (nonatomic , assign) NSInteger              sina_id;//
@property (nonatomic , copy) NSString              * idstr;
@property (nonatomic , assign) NSInteger              classify; //
@property (nonatomic , copy) NSString              * screen_name;
@property (nonatomic , copy) NSString              * name;
@property (nonatomic , copy) NSString              * province;
@property (nonatomic , copy) NSString              * city;
@property (nonatomic , copy) NSString              * location;
@property (nonatomic , copy) NSString              * sina_description; //
@property (nonatomic , copy) NSString              * url;
@property (nonatomic , copy) NSString              * profile_image_url;
@property (nonatomic , copy) NSString              * cover_image_phone;
@property (nonatomic , copy) NSString              * profile_url;
@property (nonatomic , copy) NSString              * domain;
@property (nonatomic , copy) NSString              * weihao;
@property (nonatomic , copy) NSString              * gender;
@property (nonatomic , assign) NSInteger              followers_count;
@property (nonatomic , assign) NSInteger              friends_count;
@property (nonatomic , assign) NSInteger              pagefriends_count;
@property (nonatomic , assign) NSInteger              statuses_count;
@property (nonatomic , assign) NSInteger              video_status_count;
@property (nonatomic , assign) NSInteger              favourites_count;
@property (nonatomic , copy) NSString              * created_at;
@property (nonatomic , assign) BOOL              following;
@property (nonatomic , assign) BOOL              allow_all_act_msg;
@property (nonatomic , assign) BOOL              geo_enabled;
@property (nonatomic , assign) BOOL              verified;
@property (nonatomic , assign) NSInteger              verified_type;
@property (nonatomic , copy) NSString              * remark;
@property (nonatomic , strong) Insecurity              * insecurity;
@property (nonatomic , strong) Status              * status;
@property (nonatomic , assign) NSInteger              ptype;
@property (nonatomic , assign) BOOL              allow_all_comment;
@property (nonatomic , copy) NSString              * avatar_large;
@property (nonatomic , copy) NSString              * avatar_hd;
@property (nonatomic , copy) NSString              * verified_reason;
@property (nonatomic , copy) NSString              * verified_trade;
@property (nonatomic , copy) NSString              * verified_reason_url;
@property (nonatomic , copy) NSString              * verified_source;
@property (nonatomic , copy) NSString              * verified_source_url;
@property (nonatomic , assign) BOOL              follow_me;
@property (nonatomic , assign) BOOL              like;
@property (nonatomic , assign) BOOL              like_me;
@property (nonatomic , assign) NSInteger              online_status;
@property (nonatomic , assign) NSInteger              bi_followers_count;
@property (nonatomic , copy) NSString              * lang;
@property (nonatomic , assign) NSInteger              star;
@property (nonatomic , assign) NSInteger              mbtype;
@property (nonatomic , assign) NSInteger              mbrank;
@property (nonatomic , assign) NSInteger              block_word;
@property (nonatomic , assign) NSInteger              block_app;
@property (nonatomic , assign) NSInteger              credit_score;
@property (nonatomic , assign) NSInteger              user_ability;
@property (nonatomic , assign) NSInteger              urank;
@property (nonatomic , assign) NSInteger              story_read_state;
@property (nonatomic , assign) NSInteger              vclub_member;

@end

  
