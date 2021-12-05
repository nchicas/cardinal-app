import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import CardButton from '../components/CardButton';
import CardPicker from '../components/CardPicker';
import {useStoreon} from 'storeon/react';
import {States, Events} from '../store/store';

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [enableBiometric, setEnableBiometric] = useState(false);
  const {token, dispatch} = useStoreon<States, Events>('token');

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Settings" showOption={false} />
      <View style={styles.content}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={{flex: 1, paddingTop: 10}}>
              <CardPicker
                text="Login biometric"
                selected={enableBiometric}
                onPress={() => setEnableBiometric(!enableBiometric)}
              />

              <CardButton
                text="Change password"
                icon="chevron-forward-sharp"
                onPress={() => navigation.navigate('ChangePasswordScreen')}
              />
            </View>
            <Button text="Sign out" onPress={() => dispatch('setToken', '')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  cardShadow: {
    flex: 1,
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
    flex: 1,
    padding: 20,
  },
});

export default SettingsScreen;
