import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from './piwikSdk';
export default function TrackingActions(props: any) {
  const { successMessage, setResult, eventNum } = props;
  const customDimensions = {
    1: 'beta',
    2: 'gamma',
  };
  const visitCustomVariables = { 4: { name: 'food', value: 'pizza' } };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const screenCustomVariables = { 5: { name: 'drink', value: 'water' } };

  const trackScreen = () => {
    PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, undefined)
      .then(() => {
        successMessage('track screen');
      })
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const trackScreenWithCustomDimensions = async () => {
    const options: TrackScreenOptions = {
      title: 'customDimensions',
      customDimensions,
    };

    await PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, options)
      .then(() => {
        successMessage('track screen');
      })
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const trackScreenWithCustomVariables = async () => {
    const options: TrackScreenOptions = {
      title: 'customVariables',
      visitCustomVariables,
    };

    await PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, options)
      .then(() => {
        successMessage('track screen');
      })
      .catch((error) => setResult({ message: 'Error', error }));
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
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
      setResult({ message: 'Error', error: error as Error });
    }
  };

  // const successMessage = (message: string) => {
  //   console.log(message);
  // };
  // const setResult = (tmp: any) => {
  //   console.log(tmp);
  // };

  return (
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

      <TouchableOpacity style={styles.button} onPress={trackSocialInteraction}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 5,
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});