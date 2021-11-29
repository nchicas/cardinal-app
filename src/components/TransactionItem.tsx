import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';

export type TransactionItemProps = {
  title: string;
  transactions: number;
  icon: string;
  iconColor: string;
  iconBackground: string;
  amount: number;
};

const TransactionItem = ({
  title,
  transactions,
  icon,
  iconBackground,
  iconColor,
  amount,
}: TransactionItemProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: iconBackground,
          borderRadius: 10,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{transactions} Transacciones</Text>
      </View>
      <Text style={styles.mount}>${amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  informationContainer: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    color: '#1d1f23',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    fontSize: 18,
  },
  mount: {
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#413A8B',
  },
});

export default TransactionItem;
