import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../utils.tsx/colors';

type PropsInput = {
  text?: string;
  styleDisable?: boolean;
  onPress?: () => void;
};

const Button = ({
  text = '',
  styleDisable = false,
  onPress = () => {},
}: PropsInput) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styleDisable ? styles.containerDisable : styles.container}>
      <Text style={styleDisable ? styles.titleDisable : styles.title}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.secundary,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  containerDisable: {
    marginVertical: 4,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.secundary,
  },
  titleDisable: {
    color: colors.secundary,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default Button;
