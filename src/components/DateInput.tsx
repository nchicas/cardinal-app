import moment from 'moment';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {colors} from '../utils.tsx/colors';

type PropsInput = {
  value: Date;
  onValueChange?: (value: Date) => void;
  containerStyle?: ViewStyle;
  showLabel?: boolean;
  label?: string;
};

const DateInput = ({
  value,
  onValueChange = () => {},
  containerStyle,
  showLabel = true,
  label = '',
}: PropsInput) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      {showLabel && <Text>{label}</Text>}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.container, containerStyle ? containerStyle : {}]}>
        <View style={styles.subcontainer}>
          <Text style={styles.input}>{moment(value).format('DD/MM/YYYY')}</Text>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={value}
        onConfirm={date => {
          setOpen(false);
          onValueChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whith,
    width: '100%',
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
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    color: colors.textBlack,
    fontSize: 14,
    width: '100%',
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 0,
  },
});
export default DateInput;
