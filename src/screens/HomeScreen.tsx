import React, {useState} from 'react';
import {StyleSheet, View, SectionList, Text} from 'react-native';
import TransactionItem from '../components/TransactionItem';

import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import TransactionCategory from '../models/TransactionCategory';
import TransactionStatus from '../enums/TransactionStatus';
import TransactionItemHeader from '../components/TransactionItemHeader';
import Carousel from 'react-native-snap-carousel';
import CardItem from '../components/CardItem';
import Card from '../models/Card';
import ConfirmationModal from '../components/ConfirmationModal';
import {getCardsService} from '../api/cards';
import {useStoreon} from 'storeon/react';
import {States, Events} from '../store/store';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/core';
import {getTransactionService} from '../api/transaction';
import Transaction from '../models/Transaction';
import moment from 'moment';
import lodash from 'lodash';
import ErrorModal from '../components/ErrorModal';

const HomeScreen = () => {
  const {token, dispatch} = useStoreon<States, Events>('token');
  const {dispatch: busyDispatch} = useStoreon<States, Events>('isBusy');

  const [errorModal, setErrorModal] = useState({show: false, message: ''});
  const [transactions, setTransactions] = useState<TransactionCategory[]>([]);

  const [cards, setCards] = useState<Card[]>([]);

  const [selectedCard, setSelectedCard] = useState<Card>();

  const [showModalPayment, setShowModalPayment] = useState(false);

  const loadCards = async () => {
    try {
      busyDispatch('setIsBusy', true);
      var response = await getCardsService(token);
      if (response.data.cards) {
        var newCards: Card[] = response.data.cards.map(value => {
          return {
            name: value.name_on_card,
            cardNumber: value.bank_card_number,
            amount: 0,
            isLastCard: false,
            cardRaw: value,
          };
        });
        newCards.push({
          name: '',
          cardNumber: '',
          amount: 0,
          cardRaw: undefined,
          isLastCard: true,
        });
        setCards(newCards);
        setSelectedCard(newCards[0]);
        if (newCards[0]?.cardRaw?.account?.id) {
          loadTransaction(newCards[0]?.cardRaw?.account?.id);
        } else {
          busyDispatch('setIsBusy', false);
        }
      } else {
        busyDispatch('setIsBusy', false);
      }
    } catch (error) {
      busyDispatch('setIsBusy', false);
      if (axios.isAxiosError(error)) {
        setErrorModal({show: true, message: error.message});
      }
    }
  };

  const loadTransaction = async (userId: string) => {
    try {
      busyDispatch('setIsBusy', true);
      var response = await getTransactionService(token, userId);
      if (response.data.transactions) {
        var newTransactions: Transaction[] = response.data.transactions.map(
          value => {
            return {
              title: value.details.type,
              description: value.details.description,
              amount: Number(value.details.value.amount),
              status: TransactionStatus.Ok,
              date: value.details.completed,
              dateKey: moment(value.details.completed).format('DD-MM-YYYY'),
              dataRaw: value,
            };
          },
        );
        var orderTransaction = lodash.groupBy(newTransactions, 'dateKey');
        var tc: TransactionCategory[] = [];
        for (const property in orderTransaction) {
          var value = orderTransaction[property];
          var c: TransactionCategory = {
            title: property,
            data: value,
          };
          tc.push(c);
        }
        console.log(tc.length);

        setTransactions(tc);
      }
      busyDispatch('setIsBusy', false);
    } catch (error) {
      busyDispatch('setIsBusy', false);
      if (axios.isAxiosError(error)) {
        console.log('ERROR', error);

        setErrorModal({show: true, message: error.message});
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCards();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Toolbar title="Transaction report" showGoBack={false} />

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <Carousel
            data={cards}
            renderItem={({item, index}) => (
              <CardItem
                name={item.name}
                amount={item.amount}
                cardNumber={item.cardNumber}
                isLastCard={item.isLastCard}
                data={item.cardRaw}
              />
            )}
            sliderWidth={310}
            sliderHeight={210}
            itemHeight={200}
            itemWidth={300}
            layout="tinder"
            layoutCardOffset={9}
            loop
            onSnapToItem={sliderIndex => {
              const c = cards[sliderIndex];
              setSelectedCard(c);
              if (c.cardRaw?.account?.id) {
                loadTransaction(c.cardRaw?.account?.id);
              }
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.title}>Transacciones</Text>
          <SectionList
            sections={transactions}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({item}) => (
              <TransactionItem
                title={item.title}
                description={item.description}
                amount={`$${item.amount.toFixed(2)}`}
                data={{card: selectedCard!.cardRaw, transaction: item.dataRaw}}
              />
            )}
            renderSectionHeader={({section: {title}}) => (
              <TransactionItemHeader title={title} />
            )}
          />
        </View>
      </View>

      <FloatingAction
        floatingIcon={<Icon name="cash-sharp" size={30} color={colors.whith} />}
        animated={true}
        showBackground={false}
        color={colors.secundary}
        onPressMain={() => setShowModalPayment(true)}
      />
      <ConfirmationModal
        title="New payment"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac est ipsum. Nulla dolor justo, vestibulum auctor felis nec, aliquam molestie erat. Donec ligula libero, dictum id leo eget, consectetur posuere quam. Pellentesque pellentesque nisi vel justo faucibus porta."
        show={showModalPayment}
        onValidated={() => setShowModalPayment(false)}
        onCancel={() => setShowModalPayment(false)}
      />
      <ErrorModal
        show={errorModal.show}
        title="Sign up"
        description={errorModal.message}
        onCancel={() => setErrorModal({show: false, message: ''})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    backgroundColor: colors.whith,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 100,
  },
  cardContainer: {
    height: 210,
    width: 310,
    marginTop: -100,
    alignSelf: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    color: '#1d1f23',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HomeScreen;
