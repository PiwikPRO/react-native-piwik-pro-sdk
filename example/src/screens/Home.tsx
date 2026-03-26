import type { StackScreenProps } from '@react-navigation/stack';
import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk';
import { Button, ScrollViewContainer } from '../components';
import type { RootStackParamList } from '../types/navigation';
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
    try {
      await PiwikProSdk.init(
        'https://your.piwik.pro.server.com',
        '01234567-89ab-cdef-0123-456789abcdef'
      );
      dispatch(setMessage('Success'));

      await PiwikProSdk.trackApplicationInstall();

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      dispatch(setError(message));
    }
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

type Props = StackScreenProps<RootStackParamList, 'Home'>;
