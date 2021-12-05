import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import {Text} from 'react-native-animatable';
import {useStoreon} from 'storeon/react';
import Button from '../components/Button';
import Input from '../components/Input';
import LoginTitle from '../components/LoginTitle';
import TextButton from '../components/TextButton';
import Toolbar from '../components/Toolbar';
import {States, Events} from '../store/store';
import {colors} from '../utils.tsx/colors';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {token, dispatch} = useStoreon<States, Events>('token');
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
          <Input placeholder="Email" />
          <Input placeholder="Password" isPassword />
          <View
            style={{flexDirection: 'row', width: '100%', marginVertical: 10}}>
            <View style={{flex: 1}} />
            <TextButton
              text="Forgot your password ?"
              size={12}
              color={colors.textGray}
            />
          </View>
          <Button text="Sign in" onPress={() => dispatch('setToken', 'test')} />
          <Image
            source={require('../assets/finger.png')}
            style={{
              height: 64,
              width: 64,
              marginVertical: 10,
              alignSelf: 'center',
            }}
          />
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
