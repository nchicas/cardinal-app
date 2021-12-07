import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import LoginTitle from '../components/LoginTitle';
import axios from 'axios';
import {useStoreon} from 'storeon/react';
import {loginService} from '../api/login';
import {States, Events} from '../store/store';
import ErrorModal from '../components/ErrorModal';
import {customerCreateService, linkService, signupService} from '../api/signup';
import DateInput from '../components/DateInput';

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [errorModal, setErrorModal] = useState({show: false, message: '', isFinish: false});
  const {dispatch: busyDispatch} = useStoreon<States, Events>('isBusy');
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    date: new Date(Date.now()),
  });

  const signup = async () => {
    if (validate()) {
      try {
        busyDispatch('setIsBusy', true);

        var responseLogin = await loginService(
          'cardinal',
          'a9fdf845c08d497dbee18140ce7f30da',
          'pehkymj53enfdjalzdbrext5kd415xbq1ewekwbd',
        );

        var createUser = await signupService(
          data.email,
          data.username,
          data.password,
          data.firstName,
          data.lastName,
          responseLogin.data.token,
        );

        console.log('CREATE_USER', createUser.data);

        var customer = await customerCreateService(
          data.email,
          data.firstName,
          data.lastName,
          responseLogin.data.token,
          data.date,
        );
        console.log('CUSTOMER_USER', customer.data);

        var link = await linkService(
          customer.data.customer_id,
          createUser.data.user_id,
          responseLogin.data.token,
        );

        console.log('LINK', link.data);
        setErrorModal({message: "Your account was created successfully", show: true, isFinish: false});
        busyDispatch('setIsBusy', false);
      } catch (error) {
        busyDispatch('setIsBusy', false);
        if (axios.isAxiosError(error)) {
          console.log('ERROR', error.request);

          setErrorModal({message: error.response?.data.message, show: true, isFinish: false});
        }
      }
    }
  };

  const validate = () => {
    var isValid = true;
    if (new Date(Date.now()).getFullYear() - data.date.getFullYear() < 18) {
      setErrorModal({message: 'Must be of legal age', show: true, isFinish: false});
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)
    ) {
      setErrorModal({message: 'It is not a valid email', show: true, isFinish: false});
      isValid = false;
    } else if (!data.firstName) {
      setErrorModal({message: 'It is not a valid first name', show: true, isFinish: false});
      isValid = false;
    } else if (!data.lastName) {
      setErrorModal({message: 'It is not a valid last name', show: true, isFinish: false});
      isValid = false;
    } else if (data.password !== data.repeatPassword) {
      setErrorModal({message: 'Passwords do not match', show: true, isFinish: false});
      isValid = false;
    } else if (data.password.length < 8) {
      setErrorModal({message: 'The password is too short', show: true, isFinish: false});
      isValid = false;
    } else if (!data.username) {
      setErrorModal({message: 'It is not a valid username', show: true, isFinish: false});
      isValid = false;
    }
    return isValid;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Sign up" showOption={false} />
      <View style={styles.content}>
        <LoginTitle
          title="Welcome"
          subtitle="Hello there, sign up to continue"
        />
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Input
                  label="First Name"
                  value={data.firstName}
                  onValueChange={v => setData({...data, firstName: v})}
                />
                <Input
                  label="Last Name"
                  value={data.lastName}
                  onValueChange={v => setData({...data, lastName: v})}
                />
                <Input
                  label="Username"
                  value={data.username}
                  onValueChange={v => setData({...data, username: v})}
                />
                <Input
                  label="Email"
                  value={data.email}
                  onValueChange={v => setData({...data, email: v})}
                />

                <DateInput
                  label="Date of birth"
                  value={data.date}
                  onValueChange={v => setData({...data, date: v})}
                />

                <Input
                  label="Password"
                  value={data.password}
                  isPassword
                  onValueChange={v => setData({...data, password: v})}
                />
                <Input
                  label="Repeat Password"
                  value={data.repeatPassword}
                  onValueChange={v => setData({...data, repeatPassword: v})}
                  isPassword
                />
              </View>
            </ScrollView>
            <Button text="Sign up" onPress={() => signup()} />
          </View>
        </View>
      </View>
      <ErrorModal
        show={errorModal.show}
        title="Sign in"
        description={errorModal.message}
        onCancel={() => {
          if(errorModal.isFinish){
            setErrorModal({show: false, message: '', isFinish: false})
            navigation.goBack()
          }else{
            setErrorModal({show: false, message: '', isFinish: false})
          }
          
          
        }}
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
    marginTop: 60,
  },
  fooderText: {
    marginRight: 4,
    color: '#1d1f23',
    fontFamily: 'Karla',
    fontSize: 14,
  },
  fooderBtnText: {
    fontFamily: 'Karla',
    fontSize: 14,
    color: colors.primary,
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
    padding: 10,
  },
});

export default SignupScreen;
