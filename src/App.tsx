import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {StoreContext, useStoreon} from 'storeon/react';
import store, {Events, States} from './store/store';
import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet} from 'react-native';
import {colors} from './utils.tsx/colors';

const Load = () => {
  const {token} = useStoreon<States, Events>('token');
  const {isBusy} = useStoreon<States, Events>('isBusy');
  return (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
      <Spinner
        visible={isBusy}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
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

const styles = StyleSheet.create({
  spinnerTextStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.textBlack,
  },
});

export default App;
