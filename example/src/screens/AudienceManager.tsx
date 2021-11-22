import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import { setError, setMessage } from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';
import { styles } from '../styles';

export default function AudienceManager() {
  const dispatch = useAppDispatch();
  const [audienceId, setAudienceId] = useState<string>('');

  const getProfileAttributes = async () => {
    try {
      const profileAttributes = await PiwikProSdk.getProfileAttributes();
      printProfileAttributes(profileAttributes);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const checkAudienceMembership = async () => {
    try {
      const isMember = await PiwikProSdk.checkAudienceMembership(audienceId);
      dispatch(setMessage(`audience membership: ${isMember}`));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const printProfileAttributes = (profileAttributes: ProfileAttributes) => {
    let profileAttributesString = 'Profile attributes:';

    Object.entries(profileAttributes).forEach(([key, value]) => {
      profileAttributesString = profileAttributesString.concat(
        `\n- ${key}: ${value}`
      );
    });

    dispatch(setMessage(profileAttributesString));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={getProfileAttributes}>
          <Text style={styles.buttonText}>Get profile attributes</Text>
        </TouchableOpacity>

        <Input
          value={audienceId}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          label="Audience ID"
          placeholder="Audience ID"
          onChangeText={(buttonText) => setAudienceId(buttonText)}
          autoCompleteType={undefined}
        />

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
