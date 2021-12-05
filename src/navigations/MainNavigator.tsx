import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import CardsScreen from '../screens/CardsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CreateCardScreen from '../screens/CreateCardScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createSharedElementStackNavigator();

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
    </Stack.Navigator>
  );
};

export default MainNavigator;
