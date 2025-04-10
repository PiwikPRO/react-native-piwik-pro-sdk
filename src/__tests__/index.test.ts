import { NativeModules } from 'react-native';
import PiwikProSdk, { SessionHash } from '..';
import type {
  CommonEventOptions,
  ProfileAttributes,
  TrackCustomEventOptions,
  TrackEcommerceOptions,
  TrackGoalOptions,
  TrackImpressionOptions,
  TrackInteractionOptions,
  TrackProfileAttributes,
  TrackScreenOptions,
  TrackSearchOptions,
  TrackSocialInteractionOptions,
  EcommerceProduct,
  TrackEcommerceOrderOptions,
  EcommerceOptions,
} from '../types';

const version = '0.0.1';

jest.mock('react-native', () => ({
  NativeModules: {
    PiwikProSdk: {
      init: jest.fn(),
      trackScreen: jest.fn(),
      trackCustomEvent: jest.fn(),
      trackException: jest.fn(),
      trackSocialInteraction: jest.fn(),
      trackDownload: jest.fn(),
      trackApplicationInstall: jest.fn(),
      trackApplicationUpdate: jest.fn(),
      trackOutlink: jest.fn(),
      trackSearch: jest.fn(),
      trackImpression: jest.fn(),
      trackInteraction: jest.fn(),
      trackGoal: jest.fn(),
      trackEcommerce: jest.fn(),
      trackEcommerceProductDetailView: jest.fn(),
      trackEcommerceCartUpdate: jest.fn(),
      trackEcommerceAddToCart: jest.fn(),
      trackEcommerceRemoveFromCart: jest.fn(),
      trackEcommerceOrder: jest.fn(),
      trackCampaign: jest.fn(),
      trackProfileAttributes: jest.fn(),
      getProfileAttributes: jest.fn(),
      checkAudienceMembership: jest.fn(),
      setUserId: jest.fn(),
      getUserId: jest.fn(),
      setUserEmail: jest.fn(),
      getUserEmail: jest.fn(),
      setVisitorId: jest.fn(),
      getVisitorId: jest.fn(),
      setSessionTimeout: jest.fn(),
      getSessionTimeout: jest.fn(),
      startNewSession: jest.fn(),
      dispatch: jest.fn(),
      setDispatchInterval: jest.fn(),
      getDispatchInterval: jest.fn(),
      setIncludeDefaultCustomVariables: jest.fn(),
      getIncludeDefaultCustomVariables: jest.fn(),
      setAnonymizationState: jest.fn(),
      isAnonymizationOn: jest.fn(),
      setOptOut: jest.fn(),
      getOptOut: jest.fn(),
      setDryRun: jest.fn(),
      getDryRun: jest.fn(),
      setPrefixing: jest.fn(),
      isPrefixingOn: jest.fn(),
      setVisitorIDLifetime: jest.fn(),
      setVisitorIdFromDeepLink: jest.fn(),
      getUserAgent: jest.fn(),
      setSessionHash: jest.fn(),
      getSessionHash: jest.fn(),
    },
  },
  Platform: {
    select: jest.fn(),
  },
}));

jest.mock('../version', () => ({
  version,
}));

const commonEventOptions: CommonEventOptions = {
  customDimensions: { 1: 'pizza' },
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
};

const ecommerceProduct: EcommerceProduct[] = [
  {
    sku: 'craft-311',
    name: 'Unicorn Iron on Patch',
    category: ['Crafts & Sewing', 'Toys', 'Comsmetics'],
    price: '49,9089',
    quantity: 3,
    brand: 'DMZ',
    variant: 'blue',
    customDimensions: {
      1: 'coupon-2020',
      2: '20%',
    },
  },
];

describe('PiwikProSdk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#init', () => {
    it('should call init from native SDK', async () => {
      const apiUrl = 'https://example.com';
      const siteId = '1111-2222-3333-dddd';

      await PiwikProSdk.init(apiUrl, siteId);

      expect(NativeModules.PiwikProSdk.init).toHaveBeenCalledWith(
        apiUrl,
        siteId,
        version
      );
    });
  });

  describe('#trackScreen', () => {
    it('should call trackScreen from native SDK', async () => {
      const path = 'sample/path';
      const options: TrackScreenOptions = {
        title: 'newAction',
        ...commonEventOptions,
      };

      await PiwikProSdk.trackScreen(path, options);

      expect(NativeModules.PiwikProSdk.trackScreen).toHaveBeenCalledWith(
        path,
        options
      );
    });

    it('should call trackScreen from native SDK when options are not passed', async () => {
      const path = 'sample/path';

      await PiwikProSdk.trackScreen(path);

      expect(NativeModules.PiwikProSdk.trackScreen).toHaveBeenCalledWith(
        path,
        undefined
      );
    });
  });

  describe('#trackCustomEvent', () => {
    it('should call trackCustomEvent from native SDK', async () => {
      const category = 'sample_category';
      const action = 'add';
      const options: TrackCustomEventOptions = {
        name: 'customEvent',
        path: 'some/path',
        ...commonEventOptions,
      };

      await PiwikProSdk.trackCustomEvent(category, action, options);

      expect(NativeModules.PiwikProSdk.trackCustomEvent).toHaveBeenCalledWith(
        category,
        action,
        options
      );
    });

    it('should call trackCustomEvent from native SDK when options are not passed', async () => {
      const category = 'sample_category';
      const action = 'add';

      await PiwikProSdk.trackCustomEvent(category, action);

      expect(NativeModules.PiwikProSdk.trackCustomEvent).toHaveBeenCalledWith(
        category,
        action,
        undefined
      );
    });
  });

  describe('#trackException', () => {
    it('should call trackException from native SDK', async () => {
      const description = 'sample exception';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackException(description, options);

      expect(NativeModules.PiwikProSdk.trackException).toHaveBeenCalledWith(
        description,
        options
      );
    });

    it('should call trackException from native SDK when options are not passed', async () => {
      const description = 'sample exception';

      await PiwikProSdk.trackException(description);

      expect(NativeModules.PiwikProSdk.trackException).toHaveBeenCalledWith(
        description,
        undefined
      );
    });
  });

  describe('#trackSocialInteraction', () => {
    it('should call trackSocialInteraction from native SDK', async () => {
      const interaction = 'sample exception';
      const network = 'facebook';
      const options: TrackSocialInteractionOptions = {
        ...commonEventOptions,
      };

      await PiwikProSdk.trackSocialInteraction(interaction, network, options);

      expect(
        NativeModules.PiwikProSdk.trackSocialInteraction
      ).toHaveBeenCalledWith(interaction, network, options);
    });

    it('should call trackSocialInteraction from native SDK when options are not passed', async () => {
      const interaction = 'sample exception';
      const network = 'facebook';

      await PiwikProSdk.trackSocialInteraction(interaction, network);

      expect(
        NativeModules.PiwikProSdk.trackSocialInteraction
      ).toHaveBeenCalledWith(interaction, network, undefined);
    });
  });

  describe('#trackDownload', () => {
    it('should call trackDownload from native SDK', async () => {
      const url = 'http://your.server.com/bonusmap.zip';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackDownload(url, options);

      expect(NativeModules.PiwikProSdk.trackDownload).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('should call trackDownload from native SDK when options are not passed', async () => {
      const url = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackDownload(url);

      expect(NativeModules.PiwikProSdk.trackDownload).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#trackApplicationInstall', () => {
    it('should call trackApplicationInstall from native SDK', async () => {
      await PiwikProSdk.trackApplicationInstall();

      expect(
        NativeModules.PiwikProSdk.trackApplicationInstall
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('#trackApplicationUpdate', () => {
    it('should call trackApplicationUpdate from native SDK', async () => {
      await PiwikProSdk.trackApplicationUpdate();

      expect(
        NativeModules.PiwikProSdk.trackApplicationUpdate
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('#trackOutlink', () => {
    it('should call trackOutlink from native SDK', async () => {
      const url = 'http://your.server.com/bonusmap.zip';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackOutlink(url, options);

      expect(NativeModules.PiwikProSdk.trackOutlink).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('should call trackOutlink from native SDK when options are not passed', async () => {
      const url = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackOutlink(url);

      expect(NativeModules.PiwikProSdk.trackOutlink).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#trackSearch', () => {
    it('should call trackSearch from native SDK', async () => {
      const keyword = 'http://your.server.com/bonusmap.zip';
      const options: TrackSearchOptions = {
        ...commonEventOptions,
        count: 3,
        category: 'Movies',
      };

      await PiwikProSdk.trackSearch(keyword, options);

      expect(NativeModules.PiwikProSdk.trackSearch).toHaveBeenCalledWith(
        keyword,
        options
      );
    });

    it('should call trackSearch from native SDK when options are not passed', async () => {
      const keyword = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackSearch(keyword);

      expect(NativeModules.PiwikProSdk.trackSearch).toHaveBeenCalledWith(
        keyword,
        undefined
      );
    });
  });

  describe('#trackImpression', () => {
    it('should call trackImpression from native SDK', async () => {
      const contentName = 'Some content impression';
      const options: TrackImpressionOptions = {
        ...commonEventOptions,
        piece: 'banner',
        target: 'https://www.dn.se/',
      };

      await PiwikProSdk.trackImpression(contentName, options);

      expect(NativeModules.PiwikProSdk.trackImpression).toHaveBeenCalledWith(
        contentName,
        options
      );
    });

    it('should call trackImpression from native SDK when options are not passed', async () => {
      const contentName = 'Some content impression';

      await PiwikProSdk.trackImpression(contentName);

      expect(NativeModules.PiwikProSdk.trackImpression).toHaveBeenCalledWith(
        contentName,
        undefined
      );
    });
  });

  describe('#trackInteraction', () => {
    it('should call trackInteraction from native SDK', async () => {
      const contentName = 'Some content interaction';
      const interaction = 'click';
      const options: TrackInteractionOptions = {
        ...commonEventOptions,
        piece: 'banner',
        target: 'https://www.dn.se/',
      };

      await PiwikProSdk.trackInteraction(contentName, interaction, options);

      expect(NativeModules.PiwikProSdk.trackInteraction).toHaveBeenCalledWith(
        contentName,
        interaction,
        options
      );
    });
  });

  describe('#trackGoal', () => {
    it('should call trackGoal from native SDK with currency code', async () => {
      const goal = '27ecc5e3-8ae0-40c3-964b-5bd8ee3da059';
      const options: TrackGoalOptions = {
        ...commonEventOptions,
        revenue: 3,
        currencyCode: 'USD',
      };

      await PiwikProSdk.trackGoal(goal, options);

      expect(NativeModules.PiwikProSdk.trackGoal).toHaveBeenCalledWith(
        goal,
        options
      );
    });

    it('should call trackGoal from native SDK without currency code', async () => {
      const goal = '27ecc5e3-8ae0-40c3-964b-5bd8ee3da059';
      const options: TrackGoalOptions = {
        ...commonEventOptions,
        revenue: 3,
      };

      await PiwikProSdk.trackGoal(goal, options);

      expect(NativeModules.PiwikProSdk.trackGoal).toHaveBeenCalledWith(
        goal,
        options
      );
    });

    it('should call trackGoal from native SDK when options are not passed', async () => {
      const goal = '27ecc5e3-8ae0-40c3-964b-5bd8ee3da059';

      await PiwikProSdk.trackGoal(goal);

      expect(NativeModules.PiwikProSdk.trackGoal).toHaveBeenCalledWith(
        goal,
        undefined
      );
    });
  });

  describe('#trackEcommerce', () => {
    it('should call trackEcommerce from native SDK', async () => {
      const orderId = 'transaction';
      const grandTotal = 650;
      const options: TrackEcommerceOptions = {
        ...commonEventOptions,
        discount: 0,
        shipping: 222,
        subTotal: 500,
        tax: 20,
        items: [
          {
            sku: '0123456789012',
            category: "Men's T-shirts",
            name: 'Polo T-shirt',
            price: 3000,
            quantity: 2,
          },
        ],
      };

      await PiwikProSdk.trackEcommerce(orderId, grandTotal, options);

      expect(NativeModules.PiwikProSdk.trackEcommerce).toHaveBeenCalledWith(
        orderId,
        grandTotal,
        options
      );
    });
  });

  describe('#trackEcommerceProductDetailView', () => {
    it('should call trackEcommerceProductDetailView with currency code', async () => {
      const options: EcommerceOptions = {
        ...commonEventOptions,
        currencyCode: 'EUR',
      };

      await PiwikProSdk.trackEcommerceProductDetailView(
        ecommerceProduct,
        options
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceProductDetailView
      ).toHaveBeenCalledWith(ecommerceProduct, options);
    });

    it('should call trackEcommerceProductDetailView from native SDK', async () => {
      const options: CommonEventOptions = {
        ...commonEventOptions,
      };

      await PiwikProSdk.trackEcommerceProductDetailView(
        ecommerceProduct,
        options
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceProductDetailView
      ).toHaveBeenCalledWith(ecommerceProduct, options);
    });
  });

  describe('#trackEcommerceCartUpdate', () => {
    const grandTotal = '99.99';

    it('should call trackEcommerceCartUpdate with currency code', async () => {
      const options: EcommerceOptions = {
        ...commonEventOptions,
        currencyCode: 'EUR',
      };

      await PiwikProSdk.trackEcommerceCartUpdate(
        ecommerceProduct,
        grandTotal,
        options
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceCartUpdate
      ).toHaveBeenCalledWith(ecommerceProduct, grandTotal, options);
    });

    it('should call trackEcommerceCartUpdate from native SDK without options', async () => {
      await PiwikProSdk.trackEcommerceCartUpdate(ecommerceProduct, grandTotal);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceCartUpdate
      ).toHaveBeenCalledWith(ecommerceProduct, grandTotal, undefined);
    });

    it('should call trackEcommerceCartUpdate with common options but no currency code', async () => {
      const options: CommonEventOptions = {
        ...commonEventOptions,
      };

      await PiwikProSdk.trackEcommerceCartUpdate(
        ecommerceProduct,
        grandTotal,
        options
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceCartUpdate
      ).toHaveBeenCalledWith(ecommerceProduct, grandTotal, options);
    });
  });

  describe('#trackEcommerceAddToCart', () => {
    it('should call trackEcommerceAddToCart with currency code', async () => {
      const options: EcommerceOptions = {
        ...commonEventOptions,
        currencyCode: 'EUR',
      };

      await PiwikProSdk.trackEcommerceAddToCart(ecommerceProduct, options);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceAddToCart
      ).toHaveBeenCalledWith(ecommerceProduct, options);
    });

    it('should call trackEcommerceAddToCart from native SDK without options', async () => {
      await PiwikProSdk.trackEcommerceAddToCart(ecommerceProduct);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceAddToCart
      ).toHaveBeenCalledWith(ecommerceProduct, undefined);
    });

    it('should call trackEcommerceAddToCart with common options but no currency code', async () => {
      const options: CommonEventOptions = {
        ...commonEventOptions,
      };

      await PiwikProSdk.trackEcommerceAddToCart(ecommerceProduct, options);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceAddToCart
      ).toHaveBeenCalledWith(ecommerceProduct, options);
    });
  });

  describe('#trackEcommerceRemoveFromCart', () => {
    it('should call trackEcommerceRemoveFromCart with currency code', async () => {
      const options: EcommerceOptions = {
        ...commonEventOptions,
        currencyCode: 'EUR',
      };

      await PiwikProSdk.trackEcommerceRemoveFromCart(ecommerceProduct, options);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceRemoveFromCart
      ).toHaveBeenCalledWith(ecommerceProduct, options);
    });

    it('should call trackEcommerceRemoveFromCart from native SDK without options', async () => {
      await PiwikProSdk.trackEcommerceRemoveFromCart(ecommerceProduct);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceRemoveFromCart
      ).toHaveBeenCalledWith(ecommerceProduct, undefined);
    });

    it('should call trackEcommerceRemoveFromCart with common options but no currency code', async () => {
      const options: CommonEventOptions = {
        ...commonEventOptions,
      };

      await PiwikProSdk.trackEcommerceRemoveFromCart(ecommerceProduct, options);

      expect(
        NativeModules.PiwikProSdk.trackEcommerceRemoveFromCart
      ).toHaveBeenCalledWith(ecommerceProduct, options);
    });
  });

  describe('#trackEcommerceOrder', () => {
    const orderId = 'transaction';
    const grandTotal = '650';

    it('should call trackEcommerceOrder with currency code', async () => {
      const options: TrackEcommerceOrderOptions = {
        ...commonEventOptions,
        currencyCode: 'EUR',
      };

      await PiwikProSdk.trackEcommerceOrder(
        orderId,
        grandTotal,
        ecommerceProduct,
        options
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceOrder
      ).toHaveBeenCalledWith(orderId, grandTotal, ecommerceProduct, options);
    });

    it('should call trackEcommerceOrder from native SDK without options', async () => {
      await PiwikProSdk.trackEcommerceOrder(
        orderId,
        grandTotal,
        ecommerceProduct
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceOrder
      ).toHaveBeenCalledWith(orderId, grandTotal, ecommerceProduct, undefined);
    });

    it('should call trackEcommerceOrder with common options but no currency code', async () => {
      const options: CommonEventOptions = {
        ...commonEventOptions,
      };

      await PiwikProSdk.trackEcommerceOrder(
        orderId,
        grandTotal,
        ecommerceProduct,
        options
      );

      expect(
        NativeModules.PiwikProSdk.trackEcommerceOrder
      ).toHaveBeenCalledWith(orderId, grandTotal, ecommerceProduct, options);
    });
  });

  describe('#trackCampaign', () => {
    it('should call trackCampaign from native SDK', async () => {
      const url =
        'http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore';

      await PiwikProSdk.trackCampaign(url);

      expect(NativeModules.PiwikProSdk.trackCampaign).toHaveBeenCalledWith(url);
    });

    it('should call trackCampaign from native SDK when options are not passed', async () => {
      const url =
        'http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore';

      await PiwikProSdk.trackCampaign(url);

      expect(NativeModules.PiwikProSdk.trackCampaign).toHaveBeenCalledWith(url);
    });
  });

  describe('#trackProfileAttributes', () => {
    it('should call trackProfileAttributes from native SDK properly when array is passed', async () => {
      const profileAttributes: TrackProfileAttributes = [
        { name: 'food', value: 'pizza' },
        { name: 'color', value: 'green' },
      ];

      await PiwikProSdk.trackProfileAttributes(profileAttributes);

      expect(
        NativeModules.PiwikProSdk.trackProfileAttributes
      ).toHaveBeenCalledWith(profileAttributes);
    });

    it('should call trackProfileAttributes from native SDK properly when single profile attribute is passed', async () => {
      const profileAttributes: TrackProfileAttributes = {
        name: 'food',
        value: 'pizza',
      };

      await PiwikProSdk.trackProfileAttributes(profileAttributes);

      expect(
        NativeModules.PiwikProSdk.trackProfileAttributes
      ).toHaveBeenCalledWith([profileAttributes]);
    });

    it('should throw an error when empty array is passed', async () => {
      const profileAttributes: TrackProfileAttributes = [];

      await expect(() =>
        PiwikProSdk.trackProfileAttributes(profileAttributes)
      ).rejects.toThrow(
        new Error('Profile attributes cannot be an empty array')
      );

      expect(
        NativeModules.PiwikProSdk.trackProfileAttributes
      ).not.toHaveBeenCalled();
    });
  });

  describe('#getProfileAttributes', () => {
    it('should call getProfileAttributes from native SDK and return attributes', async () => {
      const profileAttributes: ProfileAttributes = { device_type: 'desktop' };
      NativeModules.PiwikProSdk.getProfileAttributes.mockResolvedValue(
        profileAttributes
      );

      const result = await PiwikProSdk.getProfileAttributes();

      expect(result).toStrictEqual(profileAttributes);
      expect(NativeModules.PiwikProSdk.getProfileAttributes).toHaveBeenCalled();
    });
  });

  describe('#checkAudienceMembership', () => {
    it('should call checkAudienceMembership from native SDK and return status', async () => {
      const audienceId = 'audience123';
      const isMember = true;
      NativeModules.PiwikProSdk.checkAudienceMembership.mockResolvedValue(
        isMember
      );

      const result = await PiwikProSdk.checkAudienceMembership(audienceId);

      expect(result).toStrictEqual(isMember);
      expect(
        NativeModules.PiwikProSdk.checkAudienceMembership
      ).toHaveBeenCalledWith(audienceId);
    });
  });

  describe('#setUserId', () => {
    it('should call setUserId from native SDK', async () => {
      const userId = 'userId123';
      await PiwikProSdk.setUserId(userId);

      expect(NativeModules.PiwikProSdk.setUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('#getUserId', () => {
    it('should call getUserId from native SDK', async () => {
      const userId = 'user_id_5';
      NativeModules.PiwikProSdk.getUserId.mockResolvedValue(userId);
      const result = await PiwikProSdk.getUserId();

      expect(result).toStrictEqual(userId);
    });
  });

  describe('#setUserEmail', () => {
    it('should call setUserEmail from native SDK', async () => {
      const email = 'john@doe.com';
      await PiwikProSdk.setUserEmail(email);

      expect(NativeModules.PiwikProSdk.setUserEmail).toHaveBeenCalledWith(
        email
      );
    });
  });

  describe('#getUserEmail', () => {
    it('should call getUserEmail from native SDK', async () => {
      const userEmail = 'john@doe.com';
      NativeModules.PiwikProSdk.getUserEmail.mockResolvedValue(userEmail);
      const result = await PiwikProSdk.getUserEmail();

      expect(result).toStrictEqual(userEmail);
    });
  });

  describe('#setVisitorId', () => {
    it('calls setVisitorId from native SDK', async () => {
      const visitorId = '41c90f410ed00000';
      await PiwikProSdk.setVisitorId(visitorId);

      expect(NativeModules.PiwikProSdk.setVisitorId).toHaveBeenCalledWith(
        visitorId
      );
    });
  });

  describe('#getVisitorId', () => {
    it('calls getVisitorId from native SDK', async () => {
      const visitorId = '41c90f410ed00000';
      NativeModules.PiwikProSdk.getVisitorId.mockResolvedValue(visitorId);
      const result = await PiwikProSdk.getVisitorId();

      expect(result).toStrictEqual(visitorId);
    });
  });

  describe('#setSessionTimeout', () => {
    it('should call setSessionTimeout from native SDK', async () => {
      const timeout = 1200;
      await PiwikProSdk.setSessionTimeout(timeout);

      expect(NativeModules.PiwikProSdk.setSessionTimeout).toHaveBeenCalledWith(
        timeout
      );
    });
  });

  describe('#getSessionTimeout', () => {
    it('should call getSessionTimeout from native SDK', async () => {
      const timeout = 1200;
      NativeModules.PiwikProSdk.getSessionTimeout.mockResolvedValue(timeout);
      const result = await PiwikProSdk.getSessionTimeout();

      expect(result).toStrictEqual(timeout);
    });
  });

  describe('#startNewSession', () => {
    it('should call startNewSession from native SDK', async () => {
      await PiwikProSdk.startNewSession();

      expect(NativeModules.PiwikProSdk.startNewSession).toHaveBeenCalled();
    });
  });

  describe('#dispatch', () => {
    it('should call dispatch from native SDK', async () => {
      await PiwikProSdk.dispatch();

      expect(NativeModules.PiwikProSdk.dispatch).toHaveBeenCalled();
    });
  });

  describe('#setDispatchInterval', () => {
    it('should call setDispatchInterval from native SDK', async () => {
      await PiwikProSdk.setDispatchInterval(5);

      expect(
        NativeModules.PiwikProSdk.setDispatchInterval
      ).toHaveBeenCalledWith(5);
    });

    it('should throw an error if setDispatchInterval was called with float number', async () => {
      await expect(() => PiwikProSdk.setDispatchInterval(5.1)).rejects.toThrow(
        new Error('Parameter must be an integer number')
      );

      expect(
        NativeModules.PiwikProSdk.setDispatchInterval
      ).not.toHaveBeenCalled();
    });
  });

  describe('#getDispatchInterval', () => {
    it('should call getDispatchInterval from native SDK', async () => {
      NativeModules.PiwikProSdk.getDispatchInterval.mockResolvedValue(5);
      const result = await PiwikProSdk.getDispatchInterval();

      expect(result).toStrictEqual(5);
    });
  });

  describe('#setIncludeDefaultCustomVariables', () => {
    it('should call setIncludeDefaultCustomVariables from native SDK', async () => {
      await PiwikProSdk.setIncludeDefaultCustomVariables(false);

      expect(
        NativeModules.PiwikProSdk.setIncludeDefaultCustomVariables
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('#getIncludeDefaultCustomVariables', () => {
    it('should call getIncludeDefaultCustomVariables from native SDK', async () => {
      NativeModules.PiwikProSdk.getIncludeDefaultCustomVariables.mockResolvedValue(
        false
      );
      const result = await PiwikProSdk.getIncludeDefaultCustomVariables();

      expect(result).toStrictEqual(false);
    });
  });

  describe('#setAnonymizationState', () => {
    it('should call setAnonymizationState from native SDK', async () => {
      await PiwikProSdk.setAnonymizationState(false);

      expect(
        NativeModules.PiwikProSdk.setAnonymizationState
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('#isAnonymizationOn', () => {
    it('should call isAnonymizationOn from native SDK', async () => {
      NativeModules.PiwikProSdk.isAnonymizationOn.mockResolvedValue(true);
      const result = await PiwikProSdk.isAnonymizationOn();

      expect(result).toStrictEqual(true);
    });
  });

  describe('#setOptOut', () => {
    it('should call setOptOut from native SDK', async () => {
      await PiwikProSdk.setOptOut(false);

      expect(NativeModules.PiwikProSdk.setOptOut).toHaveBeenCalledWith(false);
    });
  });

  describe('#getOptOut', () => {
    it('should call getOptOut from native SDK', async () => {
      NativeModules.PiwikProSdk.getOptOut.mockResolvedValue(true);
      const result = await PiwikProSdk.getOptOut();

      expect(result).toStrictEqual(true);
    });
  });

  describe('#setDryRun', () => {
    it('should call setDryRun from native SDK', async () => {
      const dryRun = true;
      await PiwikProSdk.setDryRun(dryRun);

      expect(NativeModules.PiwikProSdk.setDryRun).toHaveBeenCalledWith(dryRun);
    });
  });

  describe('#getDryRun', () => {
    it('should call getDryRun from native SDK', async () => {
      const dryRun = true;
      NativeModules.PiwikProSdk.getDryRun.mockResolvedValue(dryRun);
      const result = await PiwikProSdk.getDryRun();

      expect(result).toStrictEqual(dryRun);
    });
  });

  describe('#setPrefixing', () => {
    it('should call setPrefixing from native SDK', async () => {
      await PiwikProSdk.setPrefixing(false);

      expect(NativeModules.PiwikProSdk.setPrefixing).toHaveBeenCalledWith(
        false
      );
    });
  });

  describe('#isPrefixingOn', () => {
    it('should call isPrefixingOn from native SDK', async () => {
      NativeModules.PiwikProSdk.isPrefixingOn.mockResolvedValue(true);
      const result = await PiwikProSdk.isPrefixingOn();

      expect(result).toStrictEqual(true);
    });
  });

  describe('#setVisitorIDLifetime', () => {
    it('should call setVisitorIDLifetime from native SDK', async () => {
      await PiwikProSdk.setVisitorIDLifetime(5);

      expect(
        NativeModules.PiwikProSdk.setVisitorIDLifetime
      ).toHaveBeenCalledWith(5);
    });

    it('should throw an error if setVisitorIDLifetime was called with float number', async () => {
      await expect(() => PiwikProSdk.setVisitorIDLifetime(5.1)).rejects.toThrow(
        new Error('Parameter must be an integer number')
      );

      expect(
        NativeModules.PiwikProSdk.setVisitorIDLifetime
      ).not.toHaveBeenCalled();
    });
  });

  describe('#setVisitorIdFromDeepLink', () => {
    it('should call setVisitorIdFromDeepLink from native SDK and return true when visitor ID is set', async () => {
      const deepLink = 'https://example.com?pk_vid=41c90f410ed00000';
      NativeModules.PiwikProSdk.setVisitorIdFromDeepLink.mockResolvedValue(
        true
      );

      const result = await PiwikProSdk.setVisitorIdFromDeepLink(deepLink);

      expect(result).toBe(true);
      expect(
        NativeModules.PiwikProSdk.setVisitorIdFromDeepLink
      ).toHaveBeenCalledWith(deepLink);
    });

    it('should call setVisitorIdFromDeepLink from native SDK and return false when no visitor ID is found', async () => {
      const deepLink = 'https://example.com';
      NativeModules.PiwikProSdk.setVisitorIdFromDeepLink.mockResolvedValue(
        false
      );

      const result = await PiwikProSdk.setVisitorIdFromDeepLink(deepLink);

      expect(result).toBe(false);
      expect(
        NativeModules.PiwikProSdk.setVisitorIdFromDeepLink
      ).toHaveBeenCalledWith(deepLink);
    });

    it('should throw an error when setVisitorIdFromDeepLink fails', async () => {
      const deepLink = 'https://example.com?pk_vid=123456789';
      const error = new Error('Failed to set visitor ID');
      NativeModules.PiwikProSdk.setVisitorIdFromDeepLink.mockRejectedValue(
        error
      );

      await expect(
        PiwikProSdk.setVisitorIdFromDeepLink(deepLink)
      ).rejects.toThrow(error);
      expect(
        NativeModules.PiwikProSdk.setVisitorIdFromDeepLink
      ).toHaveBeenCalledWith(deepLink);
    });
  });

  describe('#getUserAgent', () => {
    it('should call getUserAgent from native SDK and return the user agent string', async () => {
      const mockUserAgent = 'Mozilla/5.0 (React Native) PiwikPro/1.0.0';
      NativeModules.PiwikProSdk.getUserAgent.mockResolvedValue(mockUserAgent);

      const result = await PiwikProSdk.getUserAgent();

      expect(result).toBe(mockUserAgent);
      expect(NativeModules.PiwikProSdk.getUserAgent).toHaveBeenCalled();
    });

    it('should throw an error when getUserAgent fails', async () => {
      const error = new Error('Failed to get user agent');
      NativeModules.PiwikProSdk.getUserAgent.mockRejectedValue(error);

      await expect(PiwikProSdk.getUserAgent()).rejects.toThrow(error);
      expect(NativeModules.PiwikProSdk.getUserAgent).toHaveBeenCalled();
    });

    it('should return empty string when no user agent is set', async () => {
      NativeModules.PiwikProSdk.getUserAgent.mockResolvedValue('');

      const result = await PiwikProSdk.getUserAgent();

      expect(result).toBe('');
      expect(NativeModules.PiwikProSdk.getUserAgent).toHaveBeenCalled();
    });
  });

  describe('#setSessionHash', () => {
    it('should call setSessionHash with DISABLED value', async () => {
      await PiwikProSdk.setSessionHash(SessionHash.DISABLED);

      expect(NativeModules.PiwikProSdk.setSessionHash).toHaveBeenCalledWith(
        SessionHash.DISABLED
      );
    });

    it('should call setSessionHash with ENABLED value', async () => {
      await PiwikProSdk.setSessionHash(SessionHash.ENABLED);

      expect(NativeModules.PiwikProSdk.setSessionHash).toHaveBeenCalledWith(
        SessionHash.ENABLED
      );
    });

    it('should call setSessionHash with NOT_SET value', async () => {
      await PiwikProSdk.setSessionHash(SessionHash.NOT_SET);

      expect(NativeModules.PiwikProSdk.setSessionHash).toHaveBeenCalledWith(
        SessionHash.NOT_SET
      );
    });

    it('should throw an error when setSessionHash fails', async () => {
      const error = new Error('Failed to set session hash');
      NativeModules.PiwikProSdk.setSessionHash.mockRejectedValue(error);

      await expect(
        PiwikProSdk.setSessionHash(SessionHash.ENABLED)
      ).rejects.toThrow(error);
      expect(NativeModules.PiwikProSdk.setSessionHash).toHaveBeenCalledWith(
        SessionHash.ENABLED
      );
    });

    it('should resolve successfully when setSessionHash succeeds', async () => {
      NativeModules.PiwikProSdk.setSessionHash.mockResolvedValue(undefined);

      await expect(
        PiwikProSdk.setSessionHash(SessionHash.ENABLED)
      ).resolves.toBeUndefined();
      expect(NativeModules.PiwikProSdk.setSessionHash).toHaveBeenCalledWith(
        SessionHash.ENABLED
      );
    });
  });

  describe('#getSessionHash', () => {
    it('should return DISABLED when session hash is disabled', async () => {
      NativeModules.PiwikProSdk.getSessionHash.mockResolvedValue(
        SessionHash.DISABLED
      );

      const result = await PiwikProSdk.getSessionHash();

      expect(result).toBe(SessionHash.DISABLED);
      expect(NativeModules.PiwikProSdk.getSessionHash).toHaveBeenCalled();
    });

    it('should return ENABLED when session hash is enabled', async () => {
      NativeModules.PiwikProSdk.getSessionHash.mockResolvedValue(
        SessionHash.ENABLED
      );

      const result = await PiwikProSdk.getSessionHash();

      expect(result).toBe(SessionHash.ENABLED);
      expect(NativeModules.PiwikProSdk.getSessionHash).toHaveBeenCalled();
    });

    it('should return NOT_SET when session hash is not set', async () => {
      NativeModules.PiwikProSdk.getSessionHash.mockResolvedValue(
        SessionHash.NOT_SET
      );

      const result = await PiwikProSdk.getSessionHash();

      expect(result).toBe(SessionHash.NOT_SET);
      expect(NativeModules.PiwikProSdk.getSessionHash).toHaveBeenCalled();
    });

    it('should throw an error when getSessionHash fails', async () => {
      const error = new Error('Failed to get session hash');
      NativeModules.PiwikProSdk.getSessionHash.mockRejectedValue(error);

      await expect(PiwikProSdk.getSessionHash()).rejects.toThrow(error);
      expect(NativeModules.PiwikProSdk.getSessionHash).toHaveBeenCalled();
    });
  });
});
