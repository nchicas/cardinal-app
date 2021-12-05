import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {Text} from 'react-native-animatable';
import TransactionItem from '../components/TransactionItem';
import {SharedElement} from 'react-navigation-shared-element';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Toolbar from '../components/Toolbar';
import {colors} from '../utils.tsx/colors';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import Transaction from '../models/Transaction';
import TransactionCategory from '../models/TransactionCategory';
import TransactionStatus from '../enums/TransactionStatus';
import TransactionItemHeader from '../components/TransactionItemHeader';
import Carousel from 'react-native-snap-carousel';
import CardItem from '../components/CardItem';
import Card from '../models/Card';
import ConfirmationModal from '../components/ConfirmationModal';

const HomeScreen = () => {
  const [transactions, setTransactions] = useState<TransactionCategory[]>([
    {
      title: 'Category 1',
      data: [
        {
          title: 'Transaction 1',
          description: 'Transaction description 1',
          amount: 0,
          status: TransactionStatus.Ok,
        },
      ],
    },
    {
      title: 'Category 2',
      data: [
        {
          title: 'Transaction 2',
          description: 'Transaction description 1',
          amount: 10,
          status: TransactionStatus.Ok,
        },
        {
          title: 'Transaction 3',
          description: 'Transaction description 1',
          amount: 30,
          status: TransactionStatus.Ok,
        },
      ],
    },
  ]);

  const [cards, setCards] = useState<Card[]>([
    {name: 'John Doe', amount: 10, isLastCard: false},
    {name: 'John Doe', amount: 20, isLastCard: false},
    {name: 'John Doe', amount: 30, isLastCard: false},
    {name: '', amount: 0, isLastCard: true},
  ]);

  const [showModalPayment, setShowModalPayment] = useState(false);

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
                isLastCard={item.isLastCard}
              />
            )}
            sliderWidth={310}
            sliderHeight={210}
            itemHeight={200}
            itemWidth={300}
            layout="tinder"
            layoutCardOffset={9}
            loop
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
                amount={`+ $${item.amount}`}
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
