export type PiwikProSdkType = {
  /**
   * Initializes Piwik Pro SDK. It's recommended to initialize
   * Piwik PRO SDK only once for the entire application.
   * @apiUrl URL of your Piwik PRO server
   * @siteId ID of application you want to track
   */
  init(apiUrl: string, siteId: string): Promise<void>;

  /**
   * Sends tracking screen view event.
   * @path screen path
   * @options tracking screen options (title, customDimensions, screenCustomVariables, visitCustomVariables)
   */
  trackScreen(path: string, options?: TrackScreenOptions): Promise<void>;

  /**
   * Tracks custom event.
   * @category event category
   * @action specific event action within the category specified
   * @options custom event options (name, value, path, customDimensions, visitCustomVariables)
   */
  trackCustomEvent(
    category: string,
    action: string,
    options?: TrackCustomEventOptions
  ): Promise<void>;

  /**
   * Tracks exception.
   * @description the exception message
   * @options exception tracking options (customDimensions, visitCustomVariables)
   */
  trackException(
    description: string,
    options?: CommonEventOptions
  ): Promise<void>;

  /**
   * Tracks social interaction.
   * @interaction defines the social interaction
   * @network social network associated with interaction
   * @options social interaction tracking options (target, customDimensions, visitCustomVariables)
   */
  trackSocialInteraction(
    interaction: string,
    network: string,
    options?: TrackSocialInteractionOptions
  ): Promise<void>;

  /**
   * Tracks download.
   * @url URL of the downloaded content
   * @options download tracking options (customDimensions, visitCustomVariables)
   */
  trackDownload(url: string, options?: CommonEventOptions): Promise<void>;

  /**
   * Track installation application.
   * The event can be sent only once for each installation of the application.
   */
  trackApplicationInstall(): Promise<void>;

  /**
   * Track application update.
   * The event can be sent once per app version.
   */
  trackApplicationUpdate(): Promise<void>;

  /**
   * Tracks outlink.
   * @url outlink target
   * @options outlink tracking options (customDimensions, visitCustomVariables)
   */
  trackOutlink(url: string, options?: CommonEventOptions): Promise<void>;

  /**
   * Tracks search.
   * @keyword searched query that was used in the app
   * @options search tracking options (category, count, customDimensions, visitCustomVariables)
   */
  trackSearch(keyword: string, options?: TrackScreenOptions): Promise<void>;

  /**
   * Tracks content impression.
   * @contentName name of the content
   * @options search tracking options (piece, target, customDimensions, visitCustomVariables)
   */
  trackImpression(
    contentName: string,
    options?: TrackImpressionOptions
  ): Promise<void>;

  /**
   * Tracks content interaction.
   * @contentName name of the content
   * @interaction type of the interaction
   * @options search tracking options (piece, target, customDimensions, visitCustomVariables)
   */
  trackInteraction(
    contentName: string,
    interaction: string,
    options?: TrackInteractionOptions
  ): Promise<void>;

  /**
   * Tracks goal.
   * @goal tracking request will trigger a conversion for the goal of the website being tracked with given ID
   * @options goal tracking options (revenue, customDimensions, visitCustomVariables)
   */
  trackGoal(goal: string, options?: TrackGoalOptions): Promise<void>;

  /**
   * Tracks ecommerce transaction.
   * @orderId unique string identifying the order
   * @grandTotal total amount of the order, in cents
   * @options tracking options (subtotal, tax, shipping, discount, items)
   */
  trackEcommerce(
    orderId: string,
    grandTotal: number,
    options?: TrackEcommerceOptions
  ): Promise<void>;

  /**
   * Tracks action of viewing product page.
   * @products list of product representations
   * @options ecommerce product detail view tracking options (customDimensions, visitCustomVariables)
   */
  trackEcommerceProductDetailView(
    products: EcommerceProduct[],
    options?: CommonEventOptions
  ): Promise<void>;

  /**
   * Tracks current state of a cart.
   * @products list of product representations
   * @grandTotal The total value of items in a cart
   * @options ecommerce cart update tracking options (customDimensions, visitCustomVariables)
   */
  trackEcommerceCartUpdate(
    products: EcommerceProduct[],
    grandTotal: String,
    options?: CommonEventOptions
  ): Promise<void>;

  /**
   * Tracks action of adding products to a cart.
   * @products list of product representations
   * @options ecommerce add to cart tracking options (customDimensions, visitCustomVariables)
   */
  trackEcommerceAddToCart(
    products: EcommerceProduct[],
    options?: CommonEventOptions
  ): Promise<void>;

  /**
   * Tracks action of removing a product from a cart.
   * @products list of product representations
   * @options ecommerce remove from cart tracking options (customDimensions, visitCustomVariables)
   */
  trackEcommerceRemoveFromCart(
    products: EcommerceProduct[],
    options?: CommonEventOptions
  ): Promise<void>;

  /**
   * Tracks conversion (including products and payment details).
   * @orderId unique identifier of an order
   * @grandTotal the total value of items in a cart
   * @products list of product representations
   * @options tracking options (subtotal, tax, shipping, discount)
   */
  trackEcommerceOrder(
    orderId: string,
    grandTotal: string,
    products: EcommerceProduct[],
    options?: TrackEcommerceOrderOptions
  ): Promise<void>;

  /**
   * Tracks campaign.
   * @url campaign URL
   */
  trackCampaign(url: string): Promise<void>;

  /**
   * Tracks user profile attributes.
   * @profileAttributes profile attributes
   */
  trackProfileAttributes(
    profileAttributes: TrackProfileAttributes
  ): Promise<void>;

  /**
   * Returns user profile attributes.
   */
  getProfileAttributes(): Promise<ProfileAttributes>;

  /**
   * Checks whether user belongs to a specific group of users defined in the data manger. Returns `true` if user
   * belongs to the specified audience, `false` otherwise.
   * @param audienceId ID of the audience
   */
  checkAudienceMembership(audienceId: string): Promise<boolean>;

  /**
   * Sets the user ID
   * @param userId user ID to set
   */
  setUserId(userId: string): Promise<void>;

  /**
   * Returns the user ID
   */
  getUserId(): Promise<string>;

  /**
   * Sets the user's email
   * @param email non-null string representing email address
   */
  setUserEmail(email: string): Promise<void>;

  /**
   * Returns the user's email
   */
  getUserEmail(): Promise<string>;

  /**
   * Sets the visitor ID
   * @param visitorId string representing visitor ID
   */
  setVisitorId(visitorId: string): Promise<void>;

  /**
   * Returns the visitor ID
   */
  getVisitorId(): Promise<string>;

  /**
   * Sets the session timeout.
   * @sessionTimeout new session timeout value (in seconds)
   */
  setSessionTimeout(sessionTimeout: number): Promise<void>;

  /**
   * Starts new session.
   */
  startNewSession(): Promise<void>;

  /**
   * Returns session timeout value (in seconds).
   */
  getSessionTimeout(): Promise<number>;

  /**
   * Dispatches queued events.
   */
  dispatch(): Promise<void>;

  /**
   * Sets dispatch interval (in seconds). If `dispatchInterval` value equals `0`
   * then events will be dispatched immediately. When its value is negative
   * then events will not be dispatched automatically.
   * @dispatchInterval new dispatch interval value (in seconds)
   */
  setDispatchInterval(dispatchInterval: number): Promise<void>;

  /**
   * Returns dispatch interval (in seconds) or negative number if automatic
   * dispatch has been disabled.
   */
  getDispatchInterval(): Promise<number>;

  /**
   * Sets visitor ID lifetime (in seconds). 
   * The `visitorIDLifetime` parameter determines the length of time, in seconds, that the visitor ID can be used before it expires and is considered invalid.
   * When a visitor ID expires, a new visitor ID is generated and all parameters related to the user's activity, e.g. the time of the first event sent, are deleted.
   * In the tracker, this simulates the behavior of the new visitor.
   * If the value of this parameter is less or equal to 0, the visitorID has the expiry time disabled.
   * The default value of this parameter is 0.
   * When the SDK is upgraded to a newer version, the creation time of the visitorID is the time of the first initialisation of the SDK after the upgrade.
   */
  setVisitorIDLifetime(visitorIDLifetime: number): Promise<void>;

  /**
   * Sets flag that determines whether default custom variables should be
   * added to each tracking event.
   * @includeDefaultCustomVariable flag that determines whether to include default
   * custom variables
   */
  setIncludeDefaultCustomVariables(
    includeDefaultCustomVariables: boolean
  ): Promise<void>;

  /**
   * Returns the flag that determines whether default custom variables should be
   * added to each tracking event.
   */
  getIncludeDefaultCustomVariables(): Promise<boolean>;

  /**
   * Sets the new anonymization state.
   * @anonymizationState new anonymization state
   */
  setAnonymizationState(anonymizationState: boolean): Promise<void>;

  /**
   * Returns current anonymization state.
   */
  isAnonymizationOn(): Promise<boolean>;

  /**
   * Sets the new opt out state.
   * @optOut new opt out state
   */
  setOptOut(optOut: boolean): Promise<void>;

  /**
   * Returns current opt out state.
   */
  getOptOut(): Promise<boolean>;

  /**
   * Sets the new dry run state.
   * @dryRun new dry run state
   */
  setDryRun(dryRun: boolean): Promise<void>;

  /**
   * Returns current dry run state.
   */
  getDryRun(): Promise<boolean>;

  /**
   * Sets the new prefixing state.
   * @prefixingEnabled new prefixing state
   */
  setPrefixing(prefixingEnabled: boolean): Promise<void>;

  /**
   * Returns current prefixing state.
   */
  isPrefixingOn(): Promise<boolean>;
};

export type CustomDimensions = {
  [index: number]: string;
};

export type CustomVariable = {
  name: string;
  value: string;
};

export type CustomVariables = {
  [index: number]: CustomVariable;
};

export type CommonEventOptions = {
  customDimensions?: CustomDimensions;
  visitCustomVariables?: CustomVariables;
};

export type TrackScreenOptions = CommonEventOptions & {
  title?: string;
  screenCustomVariables?: CustomVariables;
};

export type TrackCustomEventOptions = CommonEventOptions & {
  name?: string;
  value?: number;
  path?: string;
};

export type TrackSocialInteractionOptions = CommonEventOptions & {};

export type TrackSearchOptions = CommonEventOptions & {
  category?: string;
  count?: number;
};

export type TrackImpressionOptions = CommonEventOptions & {
  piece?: string;
  target?: string;
};

export type TrackInteractionOptions = CommonEventOptions & {
  piece?: string;
  target?: string;
};

export type TrackGoalOptions = CommonEventOptions & {
  revenue?: number;
};

export type EcommerceItem = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export type EcommerceProduct = {
  sku: string;
  name?: string;
  category?: string[];
  price?: string;
  quantity?: number;
  brand?: string;
  variant?: string;
  customDimensions?: CustomDimensions;
};

export type TrackEcommerceOptions = CommonEventOptions & {
  subTotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  items?: EcommerceItem[];
};

export type TrackEcommerceOrderOptions = CommonEventOptions & {
  subTotal?: string;
  tax?: string;
  shipping?: string;
  discount?: string;
};

export type ProfileAttributes = {
  [index: string]: string;
};

export type TrackProfileAttribute = {
  name: string;
  value: string;
};

export type TrackProfileAttributes = TrackProfileAttribute | TrackProfileAttribute[];
