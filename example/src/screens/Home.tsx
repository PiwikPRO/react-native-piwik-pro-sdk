import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk';
import { Button, ScrollViewContainer } from '../components';
import {
  setDispatchInterval,
  setError,
  setMessage,
  setSdkInitializationState,
  setSessionTimeout,
  setUserEmail,
  setUserId,
  setVisitorId,
} from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';

export default function Home({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const initializePiwikProSdk = async () => {
    await PiwikProSdk.init(
      'https://astralprojection.promilci.com',
      '0bcdeb8b-8055-49ec-8425-b45ce73c46a6'
    )
      .then(() => dispatch(setMessage('Success')))
      .catch((error) => dispatch(setError(error.message)));

    const dispatchInterval = await PiwikProSdk.getDispatchInterval();
    dispatch(setDispatchInterval(dispatchInterval));
    const currentUserId = await PiwikProSdk.getUserId();
    dispatch(setUserId(currentUserId));
    const currentUserEmail = await PiwikProSdk.getUserEmail();
    dispatch(setUserEmail(currentUserEmail));
    const currentSessionTimeout = await PiwikProSdk.getSessionTimeout();
    dispatch(setSessionTimeout(currentSessionTimeout));
    const currentVisitorId = await PiwikProSdk.getVisitorId();
    dispatch(setVisitorId(currentVisitorId));
    dispatch(setSdkInitializationState(true));
  };

  return (
    <ScrollViewContainer>
      <Button onPress={initializePiwikProSdk} text="Initialize Piwik Pro SDK" />

      <Button
        onPress={() => navigation.navigate('Tracking Actions')}
        text="Tracking Actions"
      />

      <Button
        onPress={() => navigation.navigate('Audience Manager')}
        text="Audience Manager"
      />

      <Button onPress={() => navigation.navigate('Settings')} text="Settings" />
    </ScrollViewContainer>
  );
}

type RootStackParamList = {
  'Home': undefined;
  'Settings': undefined;
  'Audience Manager': undefined;
  'Tracking Actions': undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
