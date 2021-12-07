import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {StoreContext, useStoreon} from 'storeon/react';
import store, {Events, States} from './store/store';
import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet} from 'react-native';
import {colors} from './utils.tsx/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Load = () => {
  const {token, dispatch} = useStoreon<States, Events>('token');
  const {username} = useStoreon<States, Events>('password');
  const {password} = useStoreon<States, Events>('username');
  const {isBusy, dispatch: isBusyDispatch} = useStoreon<States, Events>(
    'isBusy',
  );
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        isBusyDispatch('setIsBusy', true);
        var responseToken = await AsyncStorage.getItem('token');
        var usernameToken = await AsyncStorage.getItem('username');
        var passwordToken = await AsyncStorage.getItem('password');
        dispatch('setToken', responseToken!);
        dispatch('setPassword', passwordToken!);
        dispatch('setUsername', usernameToken!);
        isBusyDispatch('setIsBusy', false);
        setLoadingData(false);
      } catch (error) {
        isBusyDispatch('setIsBusy', false);
        setLoadingData(false);
      }
    };
    load();
  }, []);

  return (
    <NavigationContainer>
      {!loadingData && (token ? <MainNavigator /> : <AuthNavigator />)}
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
