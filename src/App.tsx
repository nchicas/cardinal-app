import React from 'react';

import CardsScreen from './screens/CardsScreen';
import * as Animatable from 'react-native-animatable';
import HomeScreen from './screens/HomeScreen';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateCardScreen from './screens/CreateCardScreen';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateCardScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="CreateCardScreen" component={CreateCardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="CardsScreen"
          component={CardsScreen}
          sharedElements={(route, otherRoute, showing) => {
            const {item} = route.params;
            return [`CARD`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
