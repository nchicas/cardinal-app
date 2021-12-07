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
import {TransactionDTOItem} from '../models/TransactionDTO';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CardItemDTO} from '../models/CardsDTO';
import moment from 'moment';

export type DetailTransactionParam = {
  card?: CardItemDTO;
  transaction: TransactionDTOItem;
};

type RootStackParamList = {
  HomeScreen: DetailTransactionParam;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const DetailTransactionScreen = ({route}: Props) => {
  const parameters = route.params;
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [showModalCard, setShowModalCard] = useState(false);
  const [code, setCode] = useState('');
  console.log(parameters.card?.bank_card_number);

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Transaction detail" showOption={false} />
      <View style={styles.content}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <CardItem
                name={
                  parameters?.card?.name_on_card
                    ? parameters.card.name_on_card
                    : ''
                }
                amount={0}
                isLastCard={false}
                cardNumber={
                  parameters?.card?.bank_card_number
                    ? parameters.card.bank_card_number
                    : 'None'
                }
                disableTouch={true}
              />
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
                    value={parameters.transaction.details.type}
                    style={{flex: 1}}
                  />
                  <Text style={styles.amount}>
                    {' '}
                    {parameters.transaction.details.value.amount}
                  </Text>
                </View>
                <CardItemText
                  title="Description"
                  value={parameters.transaction.details.description}
                  style={{}}
                />
                <CardItemText
                  title="Date"
                  value={moment(parameters.transaction.details.posted).format(
                    'DD/MM/YY',
                  )}
                  style={{}}
                />
                <Text style={styles.title}>More information</Text>
                <CardItemCopy
                  title="Id"
                  value={parameters.transaction.id}
                  rawValue={parameters.transaction.id}
                />
                <CardItemCopy
                  title="Other account"
                  value={parameters.transaction.other_account.id}
                  rawValue={parameters.transaction.other_account.id}
                />
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
