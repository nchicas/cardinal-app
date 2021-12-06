import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../utils.tsx/colors';
import Button from './Button';

export type Props = {
  title: string;
  description?: string;
  onCancel?: () => void;
  show: boolean;
};

const ErrorModal = ({
  title = '',
  description = '',
  onCancel = () => {},
  show,
}: Props) => {
  return (
    <Modal transparent visible={show}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button text="Ok" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34343480',
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.whith,
    margin: 30,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.textBlack,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textBlack,
  },
});

export default ErrorModal;
