import React from 'react';

import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CreateCardScreen from '../screens/CreateCardScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailCardScreen from '../screens/DetailCardScreen';
import DetailTransactionScreen from '../screens/DetailTransactionScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateCardScreen" component={CreateCardScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen name="DetailCardScreen" component={DetailCardScreen} />
      <Stack.Screen
        name="DetailTransactionScreen"
        component={DetailTransactionScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
