import {placeholder} from '@babel/types';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../utils.tsx/colors';

type PropsInput = {
  text?: string;
  size?: number;
};

const TextButton = ({text = '', size = 20}: PropsInput) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={[styles.title, {fontSize: size}]}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: {
    color: colors.purple,
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default TextButton;
