import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../lib/stores/themeStore';
import { colors } from '../../lib/utils/theme';

import { PhoneLogin } from '../screens/Auth/PhoneLogin';
import { OtpVerify } from '../screens/Auth/OtpVerify';
import { OfficerLogin } from '../screens/Officer/Login';
import { BeneficiaryHome } from '../screens/Beneficiary/Home';
import { RecordEvidence } from '../screens/Upload/RecordEvidence';
import { SyncManager } from '../screens/Upload/SyncManager';
import { OfficerDashboard } from '../screens/Officer/Dashboard';
import { ReviewEvidence } from '../screens/Officer/ReviewEvidence';
import { NotificationCenter } from '../screens/Notifications/Center';
import { Settings } from '../screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BeneficiaryTabs() {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Upload') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Sync') {
            iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.muted,
        tabBarStyle: {
          backgroundColor: themeColors.bg,
          borderTopColor: themeColors.border,
        },
        headerStyle: {
          backgroundColor: themeColors.bg,
        },
        headerTintColor: themeColors.ink,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={BeneficiaryHome}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Upload" 
        component={RecordEvidence}
        options={{ title: 'Record Evidence' }}
      />
      <Tab.Screen 
        name="Sync" 
        component={SyncManager}
        options={{ title: 'Sync Manager' }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationCenter}
      />
    </Tab.Navigator>
  );
}

function OfficerTabs() {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.muted,
        tabBarStyle: {
          backgroundColor: themeColors.bg,
          borderTopColor: themeColors.border,
        },
        headerStyle: {
          backgroundColor: themeColors.bg,
        },
        headerTintColor: themeColors.ink,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={OfficerDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationCenter}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: themeColors.bg,
          },
          headerTintColor: themeColors.ink,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="PhoneLogin" 
          component={PhoneLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OtpVerify" 
          component={OtpVerify}
          options={{ title: 'Verify OTP' }}
        />
        <Stack.Screen 
          name="OfficerLogin" 
          component={OfficerLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={BeneficiaryTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OfficerMain" 
          component={OfficerTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RecordEvidence" 
          component={RecordEvidence}
          options={{ title: 'Record Evidence' }}
        />
        <Stack.Screen 
          name="SyncManager" 
          component={SyncManager}
          options={{ title: 'Sync Manager' }}
        />
        <Stack.Screen 
          name="ReviewEvidence" 
          component={ReviewEvidence}
          options={{ title: 'Review Evidence' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

