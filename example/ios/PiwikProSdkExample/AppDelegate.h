#import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class RCTReactNativeFactory;
@class RCTRootViewFactory;

@interface AppDelegate : RCTDefaultReactNativeFactoryDelegate <UIApplicationDelegate>

@property (nonatomic, strong, nullable) UIWindow *window;
@property (nonatomic, strong, nullable) NSString *moduleName;
@property (nonatomic, strong, nullable) NSDictionary *initialProps;
@property (nonatomic, strong, nullable) RCTReactNativeFactory *reactNativeFactory;
@property (nonatomic, assign) BOOL automaticallyLoadReactNativeWindow;

- (nullable RCTRootViewFactory *)rootViewFactory;

@end

NS_ASSUME_NONNULL_END
