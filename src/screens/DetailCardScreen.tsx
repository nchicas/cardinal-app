import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import CardItem from '../components/CardItem';
import ConfirmationModal from '../components/ConfirmationModal';
import CardItemCopy from '../components/CardItemCopy';

const DetailCardScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [showModalCard, setShowModalCard] = useState(false);
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Card detail" showOption={false} />
      <View style={styles.content}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <CardItem name="John Doe" amount={0} isLastCard={false} />
            </View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  paddingTop: 10,
                  marginHorizontal: 10,
                  marginBottom: 2,
                }}>
                <CardItemCopy title="Code" value="John Doe" />
                <CardItemCopy
                  title="Number card"
                  value="*********************51"
                />
                <CardItemCopy title="Month" value="**" />
                <CardItemCopy title="Year" value="****" />
                <CardItemCopy title="CVC" value="***" />
              </View>
            </ScrollView>
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
    padding: 20,
  },
});

export default DetailCardScreen;
