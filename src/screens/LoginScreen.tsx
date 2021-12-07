import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Text,
  Platform,
} from 'react-native';
import {useStoreon} from 'storeon/react';
import {loginService} from '../api/login';
import Button from '../components/Button';
import ErrorModal from '../components/ErrorModal';
import Input from '../components/Input';
import LoginTitle from '../components/LoginTitle';
import TextButton from '../components/TextButton';
import Toolbar from '../components/Toolbar';
import {States, Events} from '../store/store';
import {colors} from '../utils.tsx/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {dispatch: busyDispatch} = useStoreon<States, Events>('isBusy');
  const {token, dispatch} = useStoreon<States, Events>('token');
  const {dispatch: passwordDispatch} = useStoreon<States, Events>('password');
  const {dispatch: usernameDispatch} = useStoreon<States, Events>('username');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableLoginBiometric, setEnableLoginBiometric] = useState(false);
  const [errorModal, setErrorModal] = useState({show: false, message: ''});

  const requireLegacyBiometric = () => {
    return Platform.Version < 23;
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(() => {
        loginBiometric();
      })
      .catch(error => {
        if (error instanceof Error) {
          setErrorModal({show: true, message: error.message});
        }
      });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: error => {
        setErrorModal({show: true, message: error.message});
      },
    })
      .then(() => {
        loginBiometric();
      })
      .catch(error => {
        if (error instanceof Error) {
          setErrorModal({show: true, message: error.message});
        }
      });
  };

  const login = async () => {
    if (email && password) {
      try {
        busyDispatch('setIsBusy', true);
        var response = await loginService(
          email,
          password,
          'pehkymj53enfdjalzdbrext5kd415xbq1ewekwbd',
        );
        busyDispatch('setIsBusy', false);
        AsyncStorage.multiSet([
          ['token', response.data.token],
          ['password', password],
          ['username', email],
        ]);
        dispatch('setUsername', email);
        dispatch('setPassword', password);
        dispatch('setToken', response.data.token);
      } catch (error) {
        busyDispatch('setIsBusy', false);
        if (axios.isAxiosError(error)) {
          setErrorModal({message: error.response?.data.message, show: true});
        }
      }
    }
  };

  const loginBiometric = async () => {
    console.log('ERRROR');

    const emailSave = await AsyncStorage.getItem('username');

    const passwordSave = await AsyncStorage.getItem('password');
    console.log('email', emailSave);
    console.log('pass', password);
    if (emailSave && passwordSave) {
      try {
        busyDispatch('setIsBusy', true);
        var response = await loginService(
          emailSave,
          passwordSave,
          'pehkymj53enfdjalzdbrext5kd415xbq1ewekwbd',
        );
        busyDispatch('setIsBusy', false);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch('setUsername', emailSave);
        dispatch('setPassword', passwordSave);
        dispatch('setToken', response.data.token);
      } catch (error) {
        busyDispatch('setIsBusy', false);
        if (axios.isAxiosError(error)) {
          setErrorModal({message: error.response?.data.message, show: true});
        }
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      var enable = await AsyncStorage.getItem('enableLoginBiometric');
      setEnableLoginBiometric(Boolean(enable));
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Sign in" showGoBack={false} showOption={false} />
      <View style={styles.content}>
        <LoginTitle
          title="Welcome"
          subtitle="Hello there, sign in to continue"
        />

        <Image
          source={require('../assets/login.png')}
          style={{height: 160, width: 200, alignSelf: 'center', margin: 10}}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Input
            placeholder="Email"
            value={email}
            onValueChange={v => setEmail(v)}
          />
          <Input
            placeholder="Password"
            isPassword
            value={password}
            onValueChange={v => setPassword(v)}
          />
          <View
            style={{flexDirection: 'row', width: '100%', marginVertical: 10}}>
            <View style={{flex: 1}} />
            <TextButton
              text="Forgot your password ?"
              size={12}
              color={colors.textGray}
              onPress={() => navigation.navigate('RecoveryPassScreen')}
            />
          </View>
          <Button text="Sign in" onPress={() => login()} />
          {enableLoginBiometric && (
            <TouchableOpacity
              onPress={() => {
                if (requireLegacyBiometric()) {
                  authLegacy();
                } else {
                  authCurrent();
                }
              }}>
              <Image
                source={require('../assets/finger.png')}
                style={{
                  height: 64,
                  width: 64,
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <View style={styles.fooderContainer}>
            <Text style={styles.fooderText}>Dont have an account?</Text>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.fooderBtnText}>Register!</Text>
            </TouchableOpacity>
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
  fooderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fooderText: {
    marginRight: 4,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textBlack,
  },
  fooderBtnText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.secundary,
  },
});

export default LoginScreen;
