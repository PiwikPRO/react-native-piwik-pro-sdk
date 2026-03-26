import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Settings from './screens/Settings';
import AudienceManager from './screens/AudienceManager';
import TrackingActions from './screens/TrackingActions';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useAppSelector } from './store/hooks';
import { messageSelector } from './store/appSlice';
import type { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const message = useAppSelector(messageSelector);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.safeArea}
          behavior={'padding'}
          enabled={Platform.OS === 'ios'}
        >
          <View style={styles.safeArea}>
            <NavigationContainer>
              <Stack.Navigator
                detachInactiveScreens={false}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                  name="Tracking Actions"
                  component={TrackingActions}
                />
                <Stack.Screen
                  name="Audience Manager"
                  component={AudienceManager}
                />
                <Stack.Screen name="Settings" component={Settings} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
          <View style={styles.divider} />
          <ScrollView
            style={styles.messageBox}
            contentContainerStyle={styles.messageBoxContent}
          >
            <Text style={styles.message}>{message}</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
