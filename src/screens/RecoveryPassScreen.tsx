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

const RecoveryPassScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [username, setUsername] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Recovery" showOption={false} />
      <View style={styles.content}>
        <LoginTitle
          title="Welcome"
          subtitle="Hello there, recovery to continue"
        />
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Input
                  label="Username"
                  value={username}
                  onValueChange={v => setUsername(v)}
                />
              </View>
            </ScrollView>
            <Button text="Confirm" onPress={() => navigation.goBack()} />
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
  fooderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  fooderText: {
    marginRight: 4,
    color: '#1d1f23',
    fontFamily: 'Karla',
    fontSize: 14,
  },
  fooderBtnText: {
    fontFamily: 'Karla',
    fontSize: 14,
    color: colors.primary,
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
    padding: 10,
  },
});

export default RecoveryPassScreen;
