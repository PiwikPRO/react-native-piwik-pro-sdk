import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from './piwikSdk';
import { styles } from './styles';

export default function AudienceManager(props: any) {
  const { successMessage, setResult } = props;

  const getProfileAttributes = async () => {
    try {
      const profileAttributes = await PiwikProSdk.getProfileAttributes();
      console.log(profileAttributes);
      successMessage('profile attributes in console');
    } catch (error) {
      setResult({ message: 'Error', error: error as Error });
    }
  };

  const checkAudienceMembership = async () => {
    const audienceId = 'a83d4aac-faa6-4746-96eb-5ac110083f8e';

    try {
      const isMember = await PiwikProSdk.checkAudienceMembership(audienceId);
      successMessage(`audience membership: ${isMember}`);
    } catch (error) {
      setResult({ message: 'Error', error: error as Error });
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
