import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from './piwikSdk';
import { eventNumSelector, setError, setMessage } from './store/appSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { styles } from './styles';

export default function TrackingActions() {
  const eventNum = useAppSelector(eventNumSelector);
  const dispatch = useAppDispatch();
  const successMessage = (message: string) => dispatch(setMessage(message));

  const customDimensions = {
    1: 'beta',
    2: 'gamma',
  };
  const visitCustomVariables = { 4: { name: 'food', value: 'pizza' } };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const screenCustomVariables = { 5: { name: 'drink', value: 'water' } };

  const trackScreen = async () => {
    try {
      PiwikProSdk.trackScreen(`your_activity_path${eventNum}`);
      successMessage('track screen');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackScreenWithCustomDimensions = async () => {
    const options: TrackScreenOptions = {
      title: 'customDimensions',
      customDimensions,
    };

    try {
      await PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, options);
      successMessage('track screen');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackScreenWithCustomVariables = async () => {
    const options: TrackScreenOptions = {
      title: 'customVariables',
      visitCustomVariables,
    };

    try {
      await PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, options);
      successMessage('track screen');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackCustomEvent = async () => {
    const options: TrackCustomEventOptions = {
      name: 'customEvent',
      path: 'some/path',
      value: 1.5,
      visitCustomVariables,
      customDimensions,
    };

    try {
      await PiwikProSdk.trackCustomEvent(
        `custom_event_${eventNum}`,
        'custom_event_action',
        options
      );
      successMessage('track custom event');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackException = async () => {
    const options: CommonEventOptions = {
      visitCustomVariables,
    };

    try {
      await PiwikProSdk.trackException(`exception_${eventNum}`, false, options);
      successMessage('track exception');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackSocialInteraction = async () => {
    const options: TrackSocialInteractionOptions = {
      visitCustomVariables,
      target: 'Photo',
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackSocialInteraction(
        `like_${eventNum}`,
        'Facebook',
        options
      );
      successMessage('track social interaction');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackDownload = async () => {
    const options: CommonEventOptions = {
      visitCustomVariables,
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackDownload(
        `http://your.server.com/bonusmap${eventNum}.zip`,
        options
      );
      successMessage('track download');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackOutlink = async () => {
    const options: CommonEventOptions = {
      visitCustomVariables,
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackOutlink(
        `http://your.server.com/bonusmap${eventNum}.zip`,
        options
      );
      successMessage('track outlink');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackSearch = async () => {
    const options: TrackSearchOptions = {
      visitCustomVariables,
      category: `Movies`,
      count: 3,
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackSearch(`Space${eventNum}`, options);
      successMessage('track search');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackImpression = async () => {
    const options: TrackImpressionOptions = {
      visitCustomVariables,
      piece: 'banner',
      target: 'https://www.dn.se/',
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackImpression(
        `Some content impression${eventNum}`,
        options
      );
      successMessage('track impression');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackGoal = async () => {
    const options: TrackGoalOptions = {
      visitCustomVariables,
      revenue: 30,
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackGoal(1, options);
      successMessage('track goal');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const trackCampaign = async () => {
    const options: CommonEventOptions = {
      visitCustomVariables,
      // customDimensions,
    };

    try {
      await PiwikProSdk.trackCampaign(
        `http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore${eventNum}`,
        options
      );
      successMessage('track campaign');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={trackScreen}>
          <Text style={styles.buttonText}>Track screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={trackScreenWithCustomDimensions}
        >
          <Text style={styles.buttonText}>
            Track screen with custom dimensions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={trackScreenWithCustomVariables}
        >
          <Text style={styles.buttonText}>
            Track screen with custom variables
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackCustomEvent}>
          <Text style={styles.buttonText}>Track custom event</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackException}>
          <Text style={styles.buttonText}>Track exception</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={trackSocialInteraction}
        >
          <Text style={styles.buttonText}>Track social interaction</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackDownload}>
          <Text style={styles.buttonText}>Track download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackOutlink}>
          <Text style={styles.buttonText}>Track outlink</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackSearch}>
          <Text style={styles.buttonText}>Track search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackImpression}>
          <Text style={styles.buttonText}>Track impression</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackGoal}>
          <Text style={styles.buttonText}>Track goal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={trackCampaign}>
          <Text style={styles.buttonText}>Track campaign</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
