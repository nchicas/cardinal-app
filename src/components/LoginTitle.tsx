import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils.tsx/colors';

export type Props = {
  title: string;
  subtitle: string;
};

const LoginTitle = ({title, subtitle}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  title: {
    fontSize: 24,
    color: colors.secundary,
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textBlack,
    fontFamily: 'Poppins-Medium',
  },
});

export default LoginTitle;
