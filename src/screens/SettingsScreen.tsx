import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {Text} from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import TextButton from '../components/TextButton';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import DropShadow from 'react-native-drop-shadow';
import LoginTitle from '../components/LoginTitle';
import CardItem from '../components/CardItem';
import CardButton from '../components/CardButton';
import CardPicker from '../components/CardPicker';

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [enableBiometric, setEnableBiometric] = useState(false);
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
            <Button text="Sign up" onPress={() => navigation.goBack()} />
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
