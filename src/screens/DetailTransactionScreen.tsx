import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import CardItem from '../components/CardItem';
import ConfirmationModal from '../components/ConfirmationModal';
import CardItemCopy from '../components/CardItemCopy';
import CardItemText from '../components/CardItemText';
import {ScrollView} from 'react-native-gesture-handler';

const DetailTransactionScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [showModalCard, setShowModalCard] = useState(false);
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Transaction detail" showOption={false} />
      <View style={styles.content}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <CardItem name="John Doe" amount={0} isLastCard={false} />
            </View>

            <ScrollView style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  paddingTop: 10,
                  marginHorizontal: 1,
                  marginBottom: 1,
                }}>
                <Text style={styles.title}>Information</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CardItemText
                    title="Title"
                    value="Water bill"
                    style={{flex: 1}}
                  />
                  <Text style={styles.amount}> $100.00</Text>
                </View>
                <CardItemText
                  title="Description"
                  value="ANDA bill for service"
                  style={{}}
                />
                <CardItemText title="Date" value="12/12/12" style={{}} />
                <Text style={styles.title}>More information</Text>
                <CardItemCopy
                  title="Code"
                  value="3ej02399e0239je29ue8382ej93"
                />
                <CardItemCopy title="Wallet" value="3094832984093" />
                <CardItemCopy title="City" value="San Salvador" />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <ConfirmationModal
        title="New card"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac est ipsum. Nulla dolor justo, vestibulum auctor felis nec, aliquam molestie erat. Donec ligula libero, dictum id leo eget, consectetur posuere quam. Pellentesque pellentesque nisi vel justo faucibus porta."
        show={showModalCard}
        onValidated={() => {
          setShowModalCard(false);
          navigation.goBack();
        }}
        onCancel={() => setShowModalCard(false)}
      />
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
  amount: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.secundary,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: colors.textBlack,
  },
});

export default DetailTransactionScreen;
