import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';

export type TransactionItemProps = {
  title: string;
  description: string;
  amount: string;
};

const TransactionItem = ({
  title,
  description,
  amount,
}: TransactionItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="water-sharp" size={20} color={colors.whith} />
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.mount}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#3629B7',
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  informationContainer: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    color: colors.textBlack,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  description: {
    color: colors.textGray,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  mount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.secundary,
  },
});

export default TransactionItem;
