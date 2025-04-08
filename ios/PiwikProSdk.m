#import "PiwikProSdk.h"
#import <PiwikPROSDK/PiwikPROSDK.h>

@implementation PiwikProSdk

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(init,
                 initWithBaseURL:(nonnull NSString*)baseURL
                 withSiteID:(nonnull NSString*)siteID
                 withVersion:(nonnull NSString*)version
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] != nil) {
        reject(@"already_initialized", @"Piwik Pro SDK has been already initialized", nil);
        return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        PiwikTracker* tracker = [PiwikTracker sharedInstanceWithSiteID:siteID baseURL:[NSURL URLWithString:baseURL]];
        NSBundle* bundle = [NSBundle mainBundle];
        
        tracker.appName = [bundle bundleIdentifier];
        tracker.sourceTrafficName = @"react_native";
        tracker.sourceTrafficVesion = version;
        resolve(nil);
    });
}

RCT_REMAP_METHOD(trackScreen,
                 trackScreenWithPath:(nonnull NSString*)path
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        [self applyScreenCustomVariables:options[@"screenCustomVariables"]];
        
        [[PiwikTracker sharedInstance] sendView:path];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackCustomEvent,
                 trackCustomEventWithCategory:(nonnull NSString*)category
                 withAction:(nonnull NSString*)action
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendEventWithCategory:category action:action name:options[@"name"] value:options[@"value"] path:options[@"path"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackException,
                 trackExceptionWithDescription:(nonnull NSString*)description
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendExceptionWithDescription:description];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackSocialInteraction,
                 trackSocialInteractionWithInteraction:(nonnull NSString*)interaction
                 withNetwork:(nonnull NSString*)network
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendSocialInteractionWithAction:interaction network:network];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackDownload,
                 trackDownloadWithUrl:(nonnull NSString*)url
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendDownload:url];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackApplicationInstall,
                 trackApplicationInstallWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
      [[PiwikTracker sharedInstance] applicationInstall];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackApplicationUpdate,
                 trackApplicationUpdateWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
      [[PiwikTracker sharedInstance] applicationUpdate];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackOutlink,
                 trackOutlinkWithOutlink:(nonnull NSString*)outlink
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendOutlink:outlink];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackSearch,
                 trackSearchWithKeyword:(nonnull NSString*)keyword
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendSearchWithKeyword:keyword category:options[@"category"] numberOfHits:options[@"count"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackImpression,
                 trackImpressionWithContentName:(nonnull NSString*)contentName
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendContentImpressionWithName:contentName piece:options[@"piece"] target:options[@"target"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackInteraction,
                 trackInteractionWithContentName:(nonnull NSString*)contentName
                 withInteraction:(nonnull NSString*)interaction
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendContentInteractionWithName:contentName interaction:interaction piece:options[@"piece"] target:options[@"target"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackGoal,
                 trackGoalWithGoal:(nonnull NSString*)goal
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendGoalWithID:goal revenue:options[@"revenue"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackEcommerce,
                 trackEcommerceWithOrderId:(nonnull NSString*)orderId
                 withGrandTotal:(nonnull NSNumber*)grandTotal
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendTransaction:[PiwikTransaction transactionWithBlock:^(PiwikTransactionBuilder *builder) {
            builder.identifier = orderId;
            builder.grandTotal = grandTotal;
            builder.subTotal = options[@"subTotal"];
            builder.tax = options[@"tax"];
            builder.shippingCost = options[@"shipping"];
            builder.discount = options[@"discount"];
            [self buildEcommerceItems:builder withItemsArray:options[@"items"]];
        }]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackEcommerceProductDetailView,
                 trackEcommerceProductDetailViewWithProducts:(nonnull NSArray*)products
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }

    @try {
        [self applyOptionalParameters:options];
        EcommerceProducts *ecommerceProducts = [self buildEcommerceProducts:products];
        [[PiwikTracker sharedInstance] ecommerceProductDetailView: ecommerceProducts];

        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackEcommerceCartUpdate,
                 trackEcommerceCartUpdateWithProducts:(nonnull NSArray*)products
                 withGrandTotal:(nonnull NSString*)grandTotal
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }

    @try {
        [self applyOptionalParameters:options];
        EcommerceProducts *ecommerceProducts = [self buildEcommerceProducts:products];
        [[PiwikTracker sharedInstance] ecommerceCartUpdate: ecommerceProducts grandTotal: grandTotal];

        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackEcommerceAddToCart,
                 trackEcommerceAddToCartWithProducts:(nonnull NSArray*)products
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }

    @try {
        [self applyOptionalParameters:options];
        EcommerceProducts *ecommerceProducts = [self buildEcommerceProducts:products];
        [[PiwikTracker sharedInstance] ecommerceAddToCart: ecommerceProducts];

        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackEcommerceRemoveFromCart,
                 trackEcommerceRemoveFromCartWithProducts:(nonnull NSArray*)products
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }

    @try {
        [self applyOptionalParameters:options];
        EcommerceProducts *ecommerceProducts = [self buildEcommerceProducts:products];
        [[PiwikTracker sharedInstance] ecommerceRemoveFromCart: ecommerceProducts];

        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackEcommerceOrder,
                 trackEcommerceOrderWithOrderId:(nonnull NSString*)orderId
                 withGrandTotal:(nonnull NSString*)grandTotal
                 WithProducts:(nonnull NSArray*)products
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }

    @try {
        [self applyOptionalParameters:options];
        EcommerceProducts *ecommerceProducts = [self buildEcommerceProducts:products];
        [[PiwikTracker sharedInstance] ecommerceOrder:ecommerceProducts 
                                              orderId:orderId 
                                           grandTotal:grandTotal
                                             subTotal:options[@"subTotal"]
                                                  tax:options[@"tax"]
                                             shipping:options[@"shipping"]
                                             discount:options[@"discount"]];

        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackCampaign,
                 trackCampaignWithUrl:(nonnull NSString*)url
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] sendCampaign:url];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackProfileAttributes,
                 withProfileAttributes:(nonnull NSArray*)profileAttributes
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        for (NSDictionary* attribute in profileAttributes) {
            [[PiwikTracker sharedInstance] sendProfileAttributeWithName:attribute[@"name"] value:attribute[@"value"]];
        }
        
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getProfileAttributes,
                 getProfileAttributesWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] audienceManagerGetProfileAttributes:^(NSDictionary *profileAttributes, NSError * _Nullable error) {
            if(error != nil) {
                reject(@"error", @"Getting user profile attributes failed", error);
                return;
            }
            
            resolve(profileAttributes);
        }];
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(checkAudienceMembership,
                 checkAudienceMembershipWithAudienceId:(nonnull NSString*)audienceId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] checkMembershipWithAudienceID:audienceId completionBlock:^(BOOL isMember, NSError * _Nullable error) {
            if(error != nil) {
                reject(@"error", @"Checking audience membership failed", error);
                return;
            }
            
            resolve(@(isMember));
        }];
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setUserId,
                 setUserIdWithUserId:(nonnull NSString*)userId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].userID = userId;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getUserId,
                 getUserIdWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        NSString* userId = [PiwikTracker sharedInstance].userID;
        resolve(userId);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setUserEmail,
                 setUserEmailWithEmail:(nonnull NSString*)email
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].userEmail = email;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}


RCT_REMAP_METHOD(getUserEmail,
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        NSString* email = [PiwikTracker sharedInstance].userEmail;
        resolve(email);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setVisitorId,
                 withVisitorId:(nonnull NSString*)visitorId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] setVisitorID:visitorId];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getVisitorId,
                 getVisitorIdWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        NSString* visitorId = [[PiwikTracker sharedInstance] visitorID];
        resolve(visitorId);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setSessionTimeout,
                 setSessionTimeoutWithSessionTimeout:(double)sessionTimeout
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].sessionTimeout = sessionTimeout;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getSessionTimeout,
                 getSessionTimeoutWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        double sessionTimeout = [PiwikTracker sharedInstance].sessionTimeout;
        resolve(@(sessionTimeout));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(startNewSession,
                 startNewSessionWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] startNewSession];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(dispatch,
                 dispatchWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] dispatch];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setDispatchInterval,
                 setDispatchIntervalWithDispatchInterval:(double)dispatchInterval
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] setDispatchInterval:dispatchInterval];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getDispatchInterval,
                 getDispatchIntervalWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        double dispatchInterval = [PiwikTracker sharedInstance].dispatchInterval;
        resolve(@(dispatchInterval));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setVisitorIDLifetime,
                 setVisitorIDLifetimeWithVisitorIDLifetime:(double)visitorIDLifetime
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
      [PiwikTracker sharedInstance].visitorIDLifetime = visitorIDLifetime;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setIncludeDefaultCustomVariables,
                 withIncludeDefaultCustomVariables:(BOOL)includeDefaultCustomVariables
                 getDispatchIntervalWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].includeDefaultCustomVariable = includeDefaultCustomVariables;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getIncludeDefaultCustomVariables,
                 getIncludeDefaultCustomVariablesWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL includeDefaultCustomVariables = [PiwikTracker sharedInstance].includeDefaultCustomVariable;
        resolve(@(includeDefaultCustomVariables));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setAnonymizationState,
                 withAnonymizationState:(BOOL)anonymizationState
                 getDispatchIntervalWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].isAnonymizationEnabled = anonymizationState;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(isAnonymizationOn,
                 isAnonymizationOnWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL anonymizationState = [PiwikTracker sharedInstance].isAnonymizationEnabled;
        resolve(@(anonymizationState));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setOptOut,
                 setOptOutWithOptOut:(BOOL)optOut
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].optOut = optOut;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getOptOut,
                 getOptOutWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL optOut = [PiwikTracker sharedInstance].optOut;
        resolve(@(optOut));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setDryRun,
                 withDryRun:(BOOL)dryRun
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].dryRun = dryRun;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getDryRun,
                 getDryRunWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL dryRun = [PiwikTracker sharedInstance].dryRun;
        resolve(@(dryRun));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setPrefixing,
                 setPrefixingWithAnonymizationState:(BOOL)prefixingEnabled
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].isPrefixingEnabled = prefixingEnabled;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(isPrefixingOn,
                 isPrefixingOnWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL prefixingEnabled = [PiwikTracker sharedInstance].isPrefixingEnabled;
        resolve(@(prefixingEnabled));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (void)applyCustomDimensions:(nullable NSDictionary*)customDimensions {
    if (customDimensions == nil) {
        return;
    }
    
    for (NSString* key in customDimensions) {
        [[PiwikTracker sharedInstance] setCustomDimensionForID:[key intValue] value:customDimensions[key]];
    }
}

- (void)applyVisitCustomVariables:(nullable NSDictionary*)customVariables {
    if (customVariables == nil) {
        return;
    }
    
    for (NSString* key in customVariables) {
        NSDictionary* valuesDict = customVariables[key];
        [[PiwikTracker sharedInstance] setCustomVariableForIndex:[key intValue] name:valuesDict[@"name"] value:valuesDict[@"value"] scope:CustomVariableScopeVisit];
    }
}

- (void)applyScreenCustomVariables:(nullable NSDictionary*)customVariables {
    if (customVariables == nil) {
        return;
    }
    
    for (NSString* key in customVariables) {
        NSDictionary* valuesDict = customVariables[key];
        [[PiwikTracker sharedInstance] setCustomVariableForIndex:[key intValue] name:valuesDict[@"name"] value:valuesDict[@"value"] scope:CustomVariableScopeAction];
    }
}

- (void)applyOptionalParameters:(NSDictionary*)options {
    [self applyCustomDimensions:options[@"customDimensions"]];
    [self applyVisitCustomVariables:options[@"visitCustomVariables"]];
}

- (void)buildEcommerceItems:(PiwikTransactionBuilder *)builder withItemsArray:(nullable NSDictionary*)itemsArray {
    if (itemsArray == nil) {
        return;
    }
    
    for (NSDictionary* itemValues in itemsArray) {
        [builder addItemWithSku:itemValues[@"sku"] name:itemValues[@"name"] category:itemValues[@"category"] price:itemValues[@"price"] quantity:itemValues[@"quantity"]];
    }
}

- (EcommerceProducts *)buildEcommerceProducts: (nonnull NSArray*) products {
    EcommerceProducts *ecommerceProducts = [[EcommerceProducts alloc] init];
    for (NSDictionary* product in products) {
        NSMutableDictionary<NSNumber*, NSString*> *customDimensions = [NSMutableDictionary dictionary];
        if ([product[@"customDimensions"] isKindOfClass: [NSDictionary class]]) {
            NSDictionary *rawCustomDimensions = product[@"customDimensions"];
            for (NSString* key in rawCustomDimensions) {
                customDimensions[[NSNumber numberWithInt: key.intValue]] = rawCustomDimensions[key];
            }
        }

        [ecommerceProducts addProductWithSku: product[@"sku"]
                                        name: product[@"name"]
                                    category: product[@"category"]
                                       price: product[@"price"]
                                    quantity: product[@"quantity"]
                                       brand: product[@"brand"]
                                     variant: product[@"variant"]
                            customDimensions: customDimensions];
    }
    return ecommerceProducts;
}

@end
