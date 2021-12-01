import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {Text} from 'react-native-animatable';
import Button from '../components/Button';
import Input from '../components/Input';
import TextButton from '../components/TextButton';
import {colors} from '../utils.tsx/colors';

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1, marginHorizontal: 20}}>
        <View
          style={{margin: 20, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{height: 100, width: 200, backgroundColor: colors.purple}}
          />
        </View>
        <Input placeholder="First Name" icon="edit-2" />
        <Input placeholder="Last Name" icon="edit-2" />
        <Input placeholder="UserName" icon="user" />
        <Input placeholder="Email" />
        <Input placeholder="Password" isPassword icon="key" />
        <Input placeholder="Repeat Password" isPassword icon="key" />
        <View style={{flex: 0, marginVertical: 10}}>
          <Button text="Sign up" onPress={() => navigation.goBack()} />
          <Button
            text="Cancel"
            styleDisable
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
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
    color: '#1d1f23',
    fontFamily: 'Karla',
    fontSize: 14,
  },
  fooderBtnText: {
    fontFamily: 'Karla',
    fontSize: 14,
    color: colors.purple,
  },
});

export default SignupScreen;
