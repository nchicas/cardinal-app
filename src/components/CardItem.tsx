import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils.tsx/colors';

export type Props = {
  name: string;
  amount: number;
};

const CardItem = ({name, amount}: Props) => {
  return (
    <View
      style={{
        height: 200,
        width: 300,
        backgroundColor: colors.secundary,
        borderRadius: 15,
        padding: 20,
      }}>
      <Text style={styles.title}>{name}</Text>
      <View style={{flex: 1}} />
      <View>
        <Text style={styles.company}>Cardinal</Text>
        <Text style={styles.code}>*************6666</Text>
        <Text style={styles.amount}>{`$${amount}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    color: colors.whith,
    fontSize: 24,
  },
  company: {
    fontFamily: 'Poppins-Medium',
    color: colors.whith,
    fontSize: 14,
  },
  code: {
    fontFamily: 'Poppins-Regular',
    color: colors.whith,
    fontSize: 16,
  },
  amount: {
    fontFamily: 'Poppins-Bold',
    color: colors.whith,
    fontSize: 20,
  },
});

export default CardItem;
