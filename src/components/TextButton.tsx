import {placeholder} from '@babel/types';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../utils.tsx/colors';

type PropsInput = {
  text?: string;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const TextButton = ({
  text = '',
  size = 20,
  color = '#000000',
  onPress = () => {},
}: PropsInput) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.title, {fontSize: size}, {color: color}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default TextButton;
