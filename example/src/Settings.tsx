import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PiwikProSdk from './piwikSdk';
import { styles } from './styles';

export default function Settings(props: any) {
  // const { setResult, dispatchInterval, setDispatchInterval } = props;
  const setResult = (tmp: any) => tmp;
  const dispatchInterval = 1;
  const setDispatchInterval = (tmp: any) => tmp;
  const [anonymizationEnabled, setAnonymizationEnabled] =
    React.useState<boolean>(true);

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

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.subContainer}>
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
      </View>
    </ScrollView>
  );
}
