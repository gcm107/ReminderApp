import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

// adding notification imports
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import ManageReminder from './screens/ManageReminder';
import RecentReminders from './screens/RecentReminders';
import AllReminders from './screens/AllReminders';
import Map from './screens/Map';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import RemindersContextProvider from './store/reminders-context';

Notifications.setNotificationHandler({    
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function RemindersOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageReminder');
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentReminders"
        component={RecentReminders}
        options={{
          title: 'Recent Reminders',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllReminders"
        component={AllReminders}
        options={{
          title: 'All Reminders',
          tabBarLabel: 'All Reminders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Map',
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  // adding same code from 03_push_notifications we got in week8 code.
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required', 
          'Push notification need the appropriate permissions.'
        );
        return;
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }
    
    configurePushNotifications();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <RemindersContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="RemindersOverview"
              component={RemindersOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageReminder"
              component={ManageReminder}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RemindersContextProvider>
    </>
  );
}
