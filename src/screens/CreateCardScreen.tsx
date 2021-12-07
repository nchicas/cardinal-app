import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import CardItem from '../components/CardItem';
import ConfirmationModal from '../components/ConfirmationModal';
import {useStoreon} from 'storeon/react';
import {Events, States} from '../store/store';
import axios from 'axios';
import ErrorModal from '../components/ErrorModal';
import {loginService} from '../api/login';
import {createAccount, getCustomerId, getUserId} from '../api/account';
import {createCardsService} from '../api/cards';
import {createTagService} from '../api/tags';
import {smartContractService} from '../api/smartContract';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

const CreateCardScreen = () => {
  const {dispatch: busyDispatch} = useStoreon<States, Events>('isBusy');
  const {token, dispatch} = useStoreon<States, Events>('token');
  const {dispatch: dispatchCard} = useStoreon<States, Events>('cardsData');
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [showModalCard, setShowModalCard] = useState(false);
  const [errorModal, setErrorModal] = useState({
    show: false,
    message: '',
    isFinish: false,
  });
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const generateRandom = () => {
    let nc = '';
    for (var i = 0; i < 19; ++i) {
      nc += Math.floor(Math.random() * 10);
    }
    return nc;
  };

  const createCards = async () => {
    try {
      busyDispatch('setIsBusy', true);

      var responseLogin = await loginService(
        'cardinal',
        'a9fdf845c08d497dbee18140ce7f30da',
        'pehkymj53enfdjalzdbrext5kd415xbq1ewekwbd',
      );
      console.log('responseLogin', responseLogin.data);
      var userIdResponse = await getUserId(token);
      console.log('userIdResponse', userIdResponse.data);

      var customerIdResponse = await getCustomerId(token);
      console.log('customerIdResponse', customerIdResponse.data);

      var accountCreateResponse = await createAccount(
        responseLogin.data.token,
        userIdResponse.data.user_id,
        customerIdResponse.data.customers[0].legal_name,
      );
      console.log('accountCreateResponse', accountCreateResponse.data);

      var cardResponse = await createCardsService(
        customerIdResponse.data.customers[0].legal_name,
        accountCreateResponse.data.account_id,
        responseLogin.data.token,
        customerIdResponse.data.customers[0].customer_id,
        generateRandom(),
      );
      console.log('cardResponse', cardResponse.data);

      var tagWallet = await createTagService(
        token,
        accountCreateResponse.data.account_id,
        code,
      );
      console.log('tagWallet', tagWallet.data);

      var smartContractResponse = await smartContractService(
        cardResponse.data.card_id,
        code,
      );
      console.log('smartContractResponse', smartContractResponse.data);

      var tagSmartContract = await createTagService(
        token,
        accountCreateResponse.data.account_id,
        smartContractResponse.data.contract_address,
      );
      console.log('tagSmartContract', tagSmartContract.data);

      setErrorModal({
        message: 'Your card was created successfully',
        show: true,
        isFinish: true,
      });
      busyDispatch('setIsBusy', false);
    } catch (error) {
      busyDispatch('setIsBusy', false);
      if (axios.isAxiosError(error)) {
        console.log('ERROR', error.request);

        setErrorModal({
          message: error.response?.data.message,
          show: true,
          isFinish: false,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="New card" showOption={false} />
      <View style={styles.content}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <CardItem
                name="New Card"
                amount={0}
                isLastCard={false}
                cardNumber=""
              />
            </View>
            <ScrollView style={{flex: 1, paddingTop: 10}}>
              <Input
                label="Name card"
                value={name}
                onValueChange={v => setName(v)}
              />
              <Input
                label="Wallet address"
                value={code}
                onValueChange={v => setCode(v)}
              />
            </ScrollView>
            <Button text="Sign up" onPress={() => setShowModalCard(true)} />
          </View>
        </View>
      </View>
      <ConfirmationModal
        title="New card"
        description="We start the process to create a card. This will take a few seconds"
        show={showModalCard}
        onValidated={async () => {
          setShowModalCard(false);

          setTimeout(() => {
            busyDispatch('setIsBusy', true);
            const ct = generateRandom();
            const smartContract = generateRandom();
            dispatchCard('addCard', {
              name: 'Test',
              cardNumber: ct,
              amount: 0,
              cardRaw: {
                bank_card_number: ct,
                name_on_card: name,
                expires_date: moment().year(2022).toDate(),
                extra: smartContract,
              },
              isLastCard: false,
              smartContract: smartContract,
            });
            setTimeout(() => {
              busyDispatch('setIsBusy', false);
              setErrorModal({
                message: `You can now make payments and transfer using the code: ${smartContract}`,
                show: true,
                isFinish: true,
              });
            }, 5000);
          }, 500);
        }}
        onCancel={() => setShowModalCard(false)}
      />
      <ErrorModal
        show={errorModal.show}
        title="Create card"
        description={errorModal.message}
        onCancel={() => {
          if (errorModal.isFinish) {
            setErrorModal({show: false, message: '', isFinish: false});
            navigation.goBack();
          } else {
            setErrorModal({show: false, message: '', isFinish: false});
          }
        }}
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

export default CreateCardScreen;
