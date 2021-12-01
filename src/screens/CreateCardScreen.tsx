import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View, Dimensions} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import PairLabel from '../components/PairLabel';
import Toolbar from '../components/Toolbar';
import CreditCard from 'react-native-credit-card-v2';
import {SharedElement} from 'react-navigation-shared-element';
import Input from '../components/Input';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../components/Button';
import Toolbar3 from '../components/Toolbar3';

const CreateCardScreen = () => {
  const [selected, setSelected] = useState(0);
  const [cvc, setCVC] = useState('');
  const [name, setName] = useState('');
  const [numberCard, setNumberCard] = useState('');
  const [yearCard, setYearCard] = useState('');
  const [monthCard, setMonthCard] = useState('');
  const [focused, setFocused] = useState('');
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

  return (
    <View style={styles.container}>
      <Toolbar3 />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <SharedElement
            id="CARD"
            style={{borderRadius: 20, overflow: 'hidden'}}>
            <CreditCard
              width={windowWidth * 0.8}
              height={200}
              imageFront={cards.c1.bg}
              mainContainerStyle={{borderRadius: 20, overflow: 'hidden'}}
              cvc={cvc}
              name={name}
              number={numberCard}
              focused={focused}
              expiry={`${monthCard}${yearCard}`}
            />
          </SharedElement>
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Input
            placeholder={'Name'}
            value={name}
            onValueChange={v => {
              setFocused('name');
              setName(v);
            }}
            icon="link-2"
          />
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Button text="CREATE" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fbff',
  },
  pairLabelContainer: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateCardScreen;
