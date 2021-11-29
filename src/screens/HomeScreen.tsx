import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import CreditCard from 'react-native-credit-card-v2';
import Toolbar2 from '../components/Toolbar2';
import {Text} from 'react-native-animatable';
import TransactionItem from '../components/TransactionItem';
import {SharedElement} from 'react-navigation-shared-element';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<any, any>;

const HomeScreen = ({navigation}: Props) => {
  const [cardJumpingAnimation1] = useState(new Animated.Value(0));
  const [cardJumpingAnimation2] = useState(new Animated.Value(10));
  const [cardJumpingAnimation3] = useState(new Animated.Value(20));
  const [cardComtainerHeight] = useState(new Animated.Value(220));
  const [cardHeight] = useState(new Animated.Value(200));
  const [selected, setSelected] = useState(0);

  const images = [
    require('../assets/c1.png'),
    require('../assets/c2.png'),
    require('../assets/c3.png'),
    require('../assets/c4.png'),
    require('../assets/c5.png'),
  ];
  const [cards, setCards] = useState({
    c1: {
      bg: images[selected],
    },
    c2: {
      bg: images[selected + 1],
    },
    c3: {
      bg: images[selected + 2],
    },
  });

  const windowWidth = Dimensions.get('window').width;

  const swipUp = () => {
    Animated.timing(cardHeight, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(cardComtainerHeight, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const swipDown = () => {
    Animated.timing(cardHeight, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(cardComtainerHeight, {
      toValue: 220,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Toolbar2 />

      <GestureRecognizer
        onSwipeUp={() => {
          console.log('SWIPE UP');
          swipUp();
        }}
        onSwipeDown={() => {
          console.log('SWIPE DOWN');
          swipDown();
        }}
        style={styles.cardsContainer}>
        <Animated.View
          style={{
            width: '80%',
            height: cardComtainerHeight,
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Animated.View
            style={{
              backgroundColor: '#f7f7f7',
              width: '90%',
              height: cardHeight,
              borderRadius: 12,
              position: 'absolute',
              transform: [{translateY: cardJumpingAnimation3}],
              borderColor: '#f7f7f7',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.4,
              marginBottom: 10,
              elevation: 1,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#fff',
              width: '95%',
              height: cardHeight,
              borderRadius: 12,
              position: 'absolute',
              transform: [{translateY: cardJumpingAnimation2}],
              borderColor: '#f7f7f7',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.4,
              marginBottom: 10,
              elevation: 1,
            }}
          />

          <Animated.View
            style={{
              height: cardHeight,
              width: '100%',
              borderRadius: 20,
              position: 'absolute',
              transform: [{translateY: cardJumpingAnimation1}],
              elevation: 2,
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => navigation.navigate('CardsScreen')}>
              <SharedElement id="CARD" style={{width: '100%'}}>
                <CreditCard
                  width={windowWidth * 0.8}
                  imageFront={cards.c1.bg}
                  mainContainerStyle={{
                    height: cardHeight,
                  }}
                  clickable={false}
                />
              </SharedElement>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <ScrollView style={{width: '90%', flex: 1}}>
          <Text style={styles.title}>Transacciones</Text>
          <TransactionItem
            title="Compras"
            transactions={2}
            icon="shopping-bag"
            iconBackground="#def2fd"
            iconColor="#0087db"
            amount={20}
          />
          <TransactionItem
            title="Entretenimiento"
            transactions={66}
            icon="headphones"
            iconBackground="#EAE9F4"
            iconColor="#4339A0"
            amount={300}
          />
          <TransactionItem
            title="Automovil"
            transactions={5}
            icon="truck"
            iconBackground="#FAE8FC"
            iconColor="#A751B1"
            amount={100}
          />
          <TransactionItem
            title="Comida"
            transactions={14}
            icon="coffee"
            iconBackground="#FFE5E5"
            iconColor="#B84D41"
            amount={33}
          />
          <TransactionItem
            title="Drogas"
            transactions={120}
            icon="shopping-cart"
            iconBackground="#9a64ff"
            iconColor="#3d2765"
            amount={3420}
          />
        </ScrollView>
      </GestureRecognizer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fbff',
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
