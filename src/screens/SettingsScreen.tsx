import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import CardButton from '../components/CardButton';
import CardPicker from '../components/CardPicker';
import {useStoreon} from 'storeon/react';
import {States, Events} from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ErrorModal from '../components/ErrorModal';

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [enableBiometric, setEnableBiometric] = useState(false);
  const {token, dispatch} = useStoreon<States, Events>('token');
  const {password, dispatch: passwordDispatch} = useStoreon<States, Events>(
    'password',
  );
  const {username, dispatch: usernameDispatch} = useStoreon<States, Events>(
    'username',
  );
  const [errorModal, setErrorModal] = useState({show: false, message: ''});

  const requireLegacyBiometric = () => {
    return Platform.Version < 23;
  };

  const authCurrent = (isEnable: boolean) => {
    console.log('BIO', isEnable);

    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(async () => {
        // OK
        if (isEnable) {
          await AsyncStorage.setItem('enableLoginBiometric', 'true');
        } else {
          await AsyncStorage.removeItem('enableLoginBiometric');
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          setErrorModal({show: true, message: error.message});
          setEnableBiometric(!isEnable);
        }
      });
  };

  const authLegacy = (isEnable: boolean) => {
    FingerprintScanner.authenticate({
      onAttempt: error => {
        setErrorModal({show: true, message: error.message});
        setEnableBiometric(!isEnable);
      },
    })
      .then(async () => {
        if (isEnable) {
          await AsyncStorage.setItem('enableLoginBiometric', 'true');
        } else {
          await AsyncStorage.removeItem('enableLoginBiometric');
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          setErrorModal({show: true, message: error.message});
          setEnableBiometric(!isEnable);
        }
      });
  };

  const activeBioLogin = () => {
    const lastState = enableBiometric;
    try {
      setEnableBiometric(!lastState);
      if (requireLegacyBiometric()) {
        authLegacy(!lastState);
      } else {
        authCurrent(!lastState);
      }
    } catch (error) {
      setEnableBiometric(lastState);
    }
  };

  useEffect(() => {
    const load = async () => {
      var enable = await AsyncStorage.getItem('enableLoginBiometric');
      console.log('enable', enable);

      setEnableBiometric(Boolean(enable));
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Settings" showOption={false} />
      <View style={styles.content}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={{flex: 1, paddingTop: 10}}>
              <CardPicker
                text="Login biometric"
                selected={enableBiometric}
                onPress={() => activeBioLogin()}
              />
            </View>
            <Button
              text="Sign out"
              onPress={async () => {
                await AsyncStorage.removeItem('token');
                dispatch('setToken', '');
              }}
            />
          </View>
        </View>
      </View>
      <ErrorModal
        show={errorModal.show}
        title="Sign up"
        description={errorModal.message}
        onCancel={() => setErrorModal({show: false, message: ''})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  cardShadow: {
    flex: 1,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    padding: 20,
  },
});

export default SettingsScreen;
