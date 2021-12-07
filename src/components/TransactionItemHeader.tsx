import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../utils.tsx/colors';

export type TransactionItemProps = {
  title: string;
};

const TransactionItemHeader = ({title}: TransactionItemProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: colors.textGray,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
});

export default TransactionItemHeader;
