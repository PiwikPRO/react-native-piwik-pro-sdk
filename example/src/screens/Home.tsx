import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import { setDispatchInterval, setError, setMessage } from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';
import { styles } from '../styles';

export default function Home({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const initializePiwikProSdk = async () => {
    await PiwikProSdk.init(
      'https://your.piwik.pro.server.com',
      '01234567-89ab-cdef-0123-456789abcdef'
    )
      .then(() => dispatch(setMessage('Success')))
      .catch((error) => dispatch(setError(error.message)));

    const di = await PiwikProSdk.getDispatchInterval();
    dispatch(setDispatchInterval(di));
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
  'Home': undefined;
  'Settings': undefined;
  'Audience Manager': undefined;
  'Tracking Actions': undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
