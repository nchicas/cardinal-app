import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import LoginScreen from '../screens/LoginScreen';
import RecoveryPassScreen from '../screens/RecoveryPassScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createSharedElementStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="RecoveryPassScreen" component={RecoveryPassScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
