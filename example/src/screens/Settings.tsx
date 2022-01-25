import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import {
  dispatchIntervalSelector,
  sdkInitializedSelector,
  setDispatchInterval,
  setError,
  setMessage,
} from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { styles } from '../styles';
import { Input } from 'react-native-elements';

export default function Settings() {
  const dispatch = useAppDispatch();
  const successMessage = (message: string) => dispatch(setMessage(message));
  const dispatchInterval = useAppSelector(dispatchIntervalSelector);
  const sdkInitialized = useAppSelector(sdkInitializedSelector);
  const [anonymizationEnabled, setAnonymizationEnabled] =
    useState<boolean>(true);
  const [includeDefaultCustomVariables, setIncludeDefaultCustomVariables] =
    useState<boolean>(true);
  const [optOut, setOptOut] = useState<boolean>(false);
  const [prefixingEnabled, setPrefixingEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (sdkInitialized) {
      getAnonymizationState();
      getIncludeDefaultCustomVariablesState();
      getOptOutState();
      getPrefixingState();
    }
  }, [sdkInitialized]);

  const getAnonymizationState = async () => {
    const currentAnonymizationState = await PiwikProSdk.isAnonymizationOn();
    setAnonymizationEnabled(currentAnonymizationState);
  };

  const getIncludeDefaultCustomVariablesState = async () => {
    const includeCustomVariables =
      await PiwikProSdk.getIncludeDefaultCustomVariables();
    setIncludeDefaultCustomVariables(includeCustomVariables);
  };

  const getOptOutState = async () => {
    const currentOptOutState = await PiwikProSdk.getOptOut();
    setOptOut(currentOptOutState);
  };

  const getPrefixingState = async () => {
    const currentPrefixingState = await PiwikProSdk.isPrefixingOn();
    setPrefixingEnabled(currentPrefixingState);
  };

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

  const toggleOptOut = async () => {
    try {
      await PiwikProSdk.setOptOut(!optOut);
      const currentOptOutState = await PiwikProSdk.getOptOut();
      setOptOut(currentOptOutState);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const togglePrefixingState = async () => {
    try {
      await PiwikProSdk.setPrefixing(!prefixingEnabled);
      const currentPrefixingState = await PiwikProSdk.isPrefixingOn();
      setPrefixingEnabled(currentPrefixingState);
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

        <Input
          value={dispatchInterval.toString()}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          label="Dispatch interval (in seconds)"
          autoCompleteType={undefined}
          keyboardType={'numeric'}
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

        <TouchableOpacity style={styles.button} onPress={toggleOptOut}>
          <Text style={styles.buttonText}>
            Toggle opt out state, current: {optOut ? 'enabled' : 'disabled'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={togglePrefixingState}>
          <Text style={styles.buttonText}>
            Toggle prefixing state, current:{' '}
            {prefixingEnabled ? 'enabled' : 'disabled'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
