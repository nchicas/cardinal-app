import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';

export type Props = {
  name: string;
  amount: number;
  isLastCard: boolean;
};

const CardItem = ({name, amount, isLastCard}: Props) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <View
      style={{
        height: 200,
        width: 300,
        backgroundColor: colors.secundary,
        borderRadius: 15,
        padding: 20,
      }}>
      {isLastCard ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateCardScreen')}>
              <Icon name="add-circle-sharp" size={80} color={colors.whith} />
            </TouchableOpacity>
            <Text style={styles.lastText}>Add new card</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigation.navigate('DetailCardScreen')}>
          <Text style={styles.title}>{name}</Text>
          <View style={{flex: 1}} />
          <View>
            <Text style={styles.company}>Cardinal</Text>
            <Text style={styles.code}>*************6666</Text>
            <Text style={styles.amount}>{`$${amount}`}</Text>
          </View>
        </TouchableOpacity>
      )}
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
  lastText: {
    fontFamily: 'Poppins-Medium',
    color: colors.whith,
    fontSize: 20,
  },
});

export default CardItem;
