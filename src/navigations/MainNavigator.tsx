import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import CardsScreen from '../screens/CardsScreen';
import CreateCardScreen from '../screens/CreateCardScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createSharedElementStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateCardScreen" component={CreateCardScreen} />
      <Stack.Screen
        name="CardsScreen"
        component={CardsScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [`CARD`];
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
