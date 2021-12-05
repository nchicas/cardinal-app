import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';

export type Props = {
  text: string;
  icon?: string;
  onPress?: () => void;
};

const CardButton = ({text, icon = 'add', onPress = () => {}}: Props) => {
  return (
    <TouchableOpacity style={styles.cardShadow} onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text style={styles.text}>{text}</Text>
        <Icon name={icon} size={20} color={colors.textBlack} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    padding: 0,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textBlack,
  },
});

export default CardButton;
