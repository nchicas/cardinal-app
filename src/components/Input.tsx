import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils.tsx/colors';

type PropsInput = {
  placeholder?: string;
  isPassword?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  containerStyle?: ViewStyle;
  showLabel?: boolean;
  label?: string;
};

const Input = ({
  isPassword = false,
  placeholder = '',
  value = '',
  onValueChange = () => {},
  containerStyle,
  showLabel = true,
  label = '',
}: PropsInput) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <View style={[styles.container, containerStyle ? containerStyle : {}]}>
      {showLabel && <Text>{label}</Text>}
      <View style={styles.subcontainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={onValueChange}
          secureTextEntry={isPassword && !showCode}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowCode(!showCode)}>
            <Icon
              name={showCode ? 'eye' : 'eye-off'}
              size={20}
              color={colors.textBlack}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whith,
  },
  subcontainer: {
    width: '100%',
    borderColor: colors.textGray,
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    color: colors.textBlack,
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 0,
  },
});
export default Input;
