import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';
import Clipboard from '@react-native-clipboard/clipboard';


export type Props = {
  title: string;
  value: string;
  rawValue: string;
  icon?: string;
};

const CardItemCopy = ({
  title,
  value = "",
  icon = 'clipboard',
}: Props) => {
  return (
    <TouchableOpacity style={styles.cardShadow} onPress={() => {
      if(value){
        Clipboard.setString(value)
      }
    }}>
      <View style={styles.cardContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: 50,
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
    flex: 1,
  },
  text: {
    flex: 1,
    padding: 0,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: colors.textGray,
  },
  value: {
    flex: 1,
    padding: 0,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textBlack,
  },
});

export default CardItemCopy;
