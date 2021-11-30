import {placeholder} from '@babel/types';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../utils.tsx/colors';

type PropsInput = {
  text?: string;
  styleDisable?: boolean;
};

const Button = ({text = '', styleDisable = false}: PropsInput) => {
  return (
    <TouchableOpacity
      style={styleDisable ? styles.containerDisable : styles.container}>
      <Text style={styleDisable ? styles.titleDisable : styles.title}>
        {text.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.purple,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  containerDisable: {
    marginVertical: 4,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  titleDisable: {
    color: colors.purple,
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default Button;
