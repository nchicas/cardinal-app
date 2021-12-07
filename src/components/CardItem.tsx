import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CardItemDTO} from '../models/CardsDTO';
import {colors} from '../utils.tsx/colors';

export type Props = {
  cardNumber: string;
  name: string;
  amount: number;
  isLastCard: boolean;
  data?: CardItemDTO;
  disableTouch?: boolean;
};

const CardItem = ({
  name,
  cardNumber,
  amount,
  isLastCard,
  data,
  disableTouch = false,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <View
      style={{
        height: 200,
        width: 300,
        backgroundColor: colors.secundary,
        borderRadius: 15,
        overflow: 'hidden',
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
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/card.png')}
          resizeMode="cover">
          <TouchableOpacity
            style={{flex: 1, padding: 20}}
            onPress={() => {
              if (!disableTouch) {
                navigation.navigate('DetailCardScreen', data);
              }
            }}>
            <Text style={styles.title}>{name}</Text>
            <View style={{flex: 1}} />
            <View>
              <Text style={styles.company}>Cardinal</Text>
              <Text style={styles.code}>{cardNumber}</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
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
