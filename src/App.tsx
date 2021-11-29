import React from 'react';

import CardsScreen from './screens/CardsScreen';
import * as Animatable from 'react-native-animatable';
import HomeScreen from './screens/HomeScreen';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
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
