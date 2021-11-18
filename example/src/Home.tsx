import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import { styles } from './styles';

export default function Home({ navigation }: Props) {
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={initializePiwikProSdk}>
          <Text style={styles.buttonText}>Initialize Piwik Pro SDK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tracking Actions')}
        >
          <Text style={styles.buttonText}>Tracking Actions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Audience Manager')}
        >
          <Text style={styles.buttonText}>Audience Manager</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
