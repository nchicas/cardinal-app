import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';

export type Props = {
  title: string;
  showGoBack?: boolean;
  showOption?: boolean;
  color?: string;
};

const Toolbar = ({
  title = '',
  showGoBack = true,
  showOption = true,
  color = colors.whith,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <View style={styles.container}>
      {showGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={24}
            color={color}
            style={{marginRight: 16}}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.centralItem}>{title}</Text>
      {showOption && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCardScreen')}>
          <Icon name="settings-sharp" size={24} color={color} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 20,
    marginTop: 10,
  },
  centralItem: {
    flex: 1,
    fontSize: 20,
    color: colors.whith,
    fontFamily: 'Poppins-SemiBold',
    textAlignVertical: 'center',
    transform: [{translateY: 2}],
  },
});

export default Toolbar;
