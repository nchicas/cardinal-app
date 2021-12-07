import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors} from '../utils.tsx/colors';
import Button from './Button';
import {validate} from '@babel/types';

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
  const requireLegacyBiometric = () => {
    return Platform.Version < 23;
  };
  const [enableLoginBiometric, setEnableLoginBiometric] = useState(true);
  const authCurrent = () => {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(() => {
        onValidated();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: error => {
        console.log(error);
      },
    })
      .then(() => {
        onValidated();
      })
      .catch(error => {
        if (error instanceof Error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    const load = async () => {
      var enable = await AsyncStorage.getItem('enableLoginBiometric');
      setEnableLoginBiometric(Boolean(enable));
    };
    load();
  }, []);

  return (
    <Modal transparent visible={show}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {enableLoginBiometric ? (
            <TouchableOpacity
              onPress={() => {
                if (requireLegacyBiometric()) {
                  authLegacy();
                } else {
                  authCurrent();
                }
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
          ) : (
            <Button text="Accept" onPress={() => onValidated()} />
          )}
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
