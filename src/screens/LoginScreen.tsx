import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-animatable';
import {useStoreon} from 'storeon/react';
import Button from '../components/Button';
import Input from '../components/Input';
import TextButton from '../components/TextButton';
import {States, Events} from '../store/store';
import {colors} from '../utils.tsx/colors';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {token, dispatch} = useStoreon<States, Events>('token');
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{height: 200, width: 200, backgroundColor: colors.purple}}
        />
      </View>
      <View style={{flex: 0, margin: 20}}>
        <Input placeholder="Email" />
        <Input placeholder="Password" isPassword icon="key" />
        <Button text="Login" onPress={() => dispatch('setToken', 'test')} />
        <TextButton text="Forgot password?" size={16} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fooderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  fooderText: {
    marginRight: 4,
    fontFamily: 'Karla',
    fontSize: 14,
  },
  fooderBtnText: {
    fontFamily: 'Karla',
    fontSize: 14,
    color: colors.purple,
  },
});

export default LoginScreen;
