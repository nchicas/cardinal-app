import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {StoreContext, useStoreon} from 'storeon/react';
import store, {Events, States} from './store/store';
import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';

const Load = () => {
  const {token} = useStoreon<States, Events>('token');
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
