import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {colors} from '../utils.tsx/colors';
import Button from './Button';

export type Props = {
  title: string;
  description?: string;
  onValidated?: () => void;
  onCancel?: () => void;
  show: boolean;
};

const ConfirmationModal = ({
  title = '',
  description = '',
  onValidated = () => {},
  onCancel = () => {},
  show,
}: Props) => {
  return (
    <Modal transparent visible={show}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity
            onPress={() => {
              onValidated();
            }}>
            <Image
              source={require('../assets/finger.png')}
              style={{
                height: 64,
                width: 64,
                marginVertical: 10,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <Button styleDisable text="Cancelar" onPress={onCancel} />
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

export default ConfirmationModal;
