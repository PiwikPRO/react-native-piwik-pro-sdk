import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import {
  dispatchIntervalSelector,
  setDispatchInterval,
  setError,
  setMessage,
} from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { styles } from '../styles';

export default function Settings() {
  const dispatch = useAppDispatch();
  const successMessage = (message: string) => dispatch(setMessage(message));
  const dispatchInterval = useAppSelector(dispatchIntervalSelector);
  const [anonymizationEnabled, setAnonymizationEnabled] =
    React.useState<boolean>(true);
  const [includeDefaultCustomVariables, setIncludeDefaultCustomVariables] =
    React.useState<boolean>(true);

  useEffect(() => {
    const getAnonymizationState = async () => {
      const currentAnonymizationState = await PiwikProSdk.isAnonymizationOn();
      setAnonymizationEnabled(currentAnonymizationState);
    };

    const getIncludeDefaultCustomVariables = async () => {
      const includeCustomVariables =
        await PiwikProSdk.getIncludeDefaultCustomVariables();
      setIncludeDefaultCustomVariables(includeCustomVariables);
    };

    getAnonymizationState();
    getIncludeDefaultCustomVariables();
  }, []);

  const dispatchEvents = async () => {
    try {
      await PiwikProSdk.dispatch();
      successMessage('Dispatched successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const changeDispatchInterval = async () => {
    try {
      await PiwikProSdk.setDispatchInterval(dispatchInterval);
      successMessage('Dispatch interval changed successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const toggleAnonymizationState = async () => {
    try {
      await PiwikProSdk.setAnonymizationState(!anonymizationEnabled);
      const currentAnonymizationState = await PiwikProSdk.isAnonymizationOn();
      setAnonymizationEnabled(currentAnonymizationState);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const toggleIncludeDefaultCustomVariables = async () => {
    try {
      await PiwikProSdk.setIncludeDefaultCustomVariables(
        !includeDefaultCustomVariables
      );
      const includeCustomVariables =
        await PiwikProSdk.getIncludeDefaultCustomVariables();
      setIncludeDefaultCustomVariables(includeCustomVariables);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
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
            dispatch(setDispatchInterval(parseInt(buttonText, 10) || 0))
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

        <TouchableOpacity
          style={styles.button}
          onPress={toggleIncludeDefaultCustomVariables}
        >
          <Text style={styles.buttonText}>
            Toggle include default custom variables state, current:{' '}
            {includeDefaultCustomVariables ? 'enabled' : 'disabled'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
