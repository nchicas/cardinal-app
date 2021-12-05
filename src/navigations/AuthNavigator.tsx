import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RecoveryPassScreen from '../screens/RecoveryPassScreen';
import SignupScreen from '../screens/SignupScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
