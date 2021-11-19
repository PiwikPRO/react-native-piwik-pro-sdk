import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import { setError, setMessage } from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';
import { styles } from '../styles';

export default function AudienceManager() {
  const dispatch = useAppDispatch();

  const getProfileAttributes = async () => {
    try {
      const profileAttributes = await PiwikProSdk.getProfileAttributes();
      console.log(profileAttributes);
      dispatch(setMessage('profile attributes in console'));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const checkAudienceMembership = async () => {
    const audienceId = 'a83d4aac-faa6-4746-96eb-5ac110083f8e';

    try {
      const isMember = await PiwikProSdk.checkAudienceMembership(audienceId);
      dispatch(setMessage(`audience membership: ${isMember}`));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={getProfileAttributes}>
          <Text style={styles.buttonText}>Get profile attributes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={checkAudienceMembership}
        >
          <Text style={styles.buttonText}>Check audience membership</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
