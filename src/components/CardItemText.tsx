import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';

export type Props = {
  title: string;
  value: string;
  icon?: string;
  style?: ViewStyle;
};

const CardItemText = ({
  title,
  value,
  icon = 'clipboard',
  style = {},
}: Props) => {
  return (
    <View style={{...styles.cardShadow, ...style}}>
      <View style={styles.cardContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    backgroundColor: 'transparent',
    height: 50,
  },
  cardContainer: {
    backgroundColor: '#fff',
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

export default CardItemText;
