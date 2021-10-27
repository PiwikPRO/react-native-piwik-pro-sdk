import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';

export default function App() {
  const [result, setResult] = React.useState<{
    message: String;
    error?: Error;
  }>({ message: 'Press any button' });
  const [eventNum, setEventNum] = React.useState<number>(1);
  const [dispatchInterval, setDispatchInterval] = React.useState<number>(0);
  const [anonymizationEnabled, setAnonymizationEnabled] =
    React.useState<boolean>(true);

  const customDimensions = {
    1: 'beta',
    2: 'gamma',
  };
  const visitCustomVariables = { 4: { name: 'food', value: 'pizza' } };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const screenCustomVariables = { 5: { name: 'drink', value: 'water' } };

  const initializePiwikProSdk = async () => {
    await PiwikProSdk.init(
      'https://your.piwik.pro.server.com',
      '01234567-89ab-cdef-0123-456789abcdef'
    )
      .then(() => setResult({ message: 'Success' }))
      .catch((error) => setResult({ message: 'Error', error }));

    const di = await PiwikProSdk.getDispatchInterval();
    setDispatchInterval(di);
    console.log('Dispatch interval:', di);

    const includeDefaultCustomVariables = true;
    await PiwikProSdk.setIncludeDefaultCustomVariables(
      includeDefaultCustomVariables
    );
    const include = await PiwikProSdk.getIncludeDefaultCustomVariables();
    console.log('Include default custom variables:', include);
  };

  const trackScreen = () => {
    PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, undefined)
      .then(() => {
        setResult({ message: `Success track screen ${eventNum}` });
        setEventNum(eventNum + 1);
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
        setResult({ message: `Success track screen ${eventNum}` });
        setEventNum(eventNum + 1);
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
        setResult({ message: `Success track screen ${eventNum}` });
        setEventNum(eventNum + 1);
      })
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const dispatchEvents = () => {
    PiwikProSdk.dispatch()
      .then(() => setResult({ message: 'Dispatched successfully' }))
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const changeDispatchInterval = async () => {
    await PiwikProSdk.setDispatchInterval(dispatchInterval)
      .then(() => setResult({ message: 'Changed successfully' }))
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const toggleAnonymizationState = async () => {
    await PiwikProSdk.setAnonymizationState(!anonymizationEnabled);
    const currentAnonymizationState = await PiwikProSdk.isAnonymizationOn();
    setAnonymizationEnabled(currentAnonymizationState);
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
      setEventNum(eventNum + 1);
    } catch (error) {
      setResult({ message: 'Error', error: error as Error });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={initializePiwikProSdk}
          >
            <Text style={styles.buttonText}>Initialize Piwik Pro SDK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={dispatchEvents}>
            <Text style={styles.buttonText}>Dispatch events</Text>
          </TouchableOpacity>

          <TextInput
            value={dispatchInterval.toString()}
            onChangeText={(buttonText) =>
              setDispatchInterval(parseInt(buttonText, 10) || 0)
            }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={changeDispatchInterval}
          >
            <Text style={styles.buttonText}>Set dispatch interval</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={toggleAnonymizationState}
          >
            <Text style={styles.buttonText}>
              Toggle anonymization state, current:{' '}
              {anonymizationEnabled ? 'enabled' : 'disabled'}
            </Text>
          </TouchableOpacity>

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
        </View>
      </ScrollView>
      <Text style={styles.message}>Result: {result.message}</Text>
      {result.error && (
        <Text style={styles.message}>Error type: {result.error.message}</Text>
      )}
    </SafeAreaView>
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
