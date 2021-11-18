import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Settings from './Settings';
import AudienceManager from './AudienceManager';
import TrackingActions from './TrackingActions';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from './styles';

const Stack = createNativeStackNavigator();
const result = { message: 'Press any button', error: { message: 'No error' } };

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tracking Actions" component={TrackingActions} />
          <Stack.Screen name="Audience Manager" component={AudienceManager} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.message}>{result.message}</Text>
        {result.error && (
          <Text style={styles.message}>Error type: {result.error.message}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
