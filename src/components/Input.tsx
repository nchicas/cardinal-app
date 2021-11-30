import {placeholder} from '@babel/types';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../utils.tsx/colors';

type PropsInput = {
  placeholder: string;
  icon?: string;
  isPassword?: boolean;
};

const Input = ({
  isPassword = false,
  placeholder,
  icon = 'mail',
}: PropsInput) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={20} color={colors.purple} />
      <TextInput placeholder={placeholder} style={styles.input} />
      {isPassword && <Icon name="eye" size={20} color={colors.purple} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.purple,
    borderWidth: 2,
    marginVertical: 4,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  input: {
    color: '#1d1f23ds',
    fontFamily: 'Karla',
    fontSize: 20,
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
  },
});
export default Input;