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

import {StoreContext, useStoreon} from 'storeon/react';
import store, {Events, States} from './store/store';
import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';

const Stack = createSharedElementStackNavigator();

const Load = () => {
  const {token, dispatch} = useStoreon<States, Events>('token');
  return (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Load />
    </StoreContext.Provider>
  );
};

export default App;
