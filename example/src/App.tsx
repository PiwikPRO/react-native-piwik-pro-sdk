import * as React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AudienceManager from './AudienceManager';
import PiwikProSdk from './piwikSdk';
import Settings from './Settings';
import { styles } from './styles';
import TrackingActions from './TrackingActions';

export default function App() {
  const [result, setResult] = React.useState<{
    message: String;
    error?: Error;
  }>({ message: 'Press any button' });
  const [eventNum, setEventNum] = React.useState<number>(1);
  const [dispatchInterval, setDispatchInterval] = React.useState<number>(0);

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

    const includeDefaultCustomVariables = true; //TODO
    await PiwikProSdk.setIncludeDefaultCustomVariables(
      includeDefaultCustomVariables
    );
    const include = await PiwikProSdk.getIncludeDefaultCustomVariables();
    console.log('Include default custom variables:', include);
  };

  const successMessage = (eventType: string) => {
    setResult({ message: `Success: ${eventType} ${eventNum}` });
    setEventNum(eventNum + 1);
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

          <TrackingActions
            successMessage={successMessage}
            setResult={setResult}
            eventNum={eventNum}
          />

          <Settings
            setResult={setResult}
            dispatchInterval={dispatchInterval}
            setDispatchInterval={setDispatchInterval}
          />

          <AudienceManager
            successMessage={successMessage}
            setResult={setResult}
          />
        </View>
      </ScrollView>
      <Text style={styles.message}>{result.message}</Text>
      {result.error && (
        <Text style={styles.message}>Error type: {result.error.message}</Text>
      )}
    </SafeAreaView>
  );
}
