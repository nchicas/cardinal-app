import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View, Dimensions} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import PairLabel from '../components/PairLabel';
import Toolbar from '../components/Toolbar';
import CreditCard from 'react-native-credit-card-v2';
import {SharedElement} from 'react-navigation-shared-element';

const CardsScreen = () => {
  const [cardJumpingAnimation1] = useState(new Animated.Value(0));
  const [cardJumpingAnimation2] = useState(new Animated.Value(10));
  const [cardJumpingAnimation3] = useState(new Animated.Value(20));
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

  const [cardRotateAnimation, setCardRotateAnimation] = useState(
    new Animated.Value(40),
  );

  const [cardMoveAnimation, setCardMoveAnimation] = useState(
    new Animated.Value(0),
  );

  const [cardMoveSAnimation, setCardSMoveAnimation] = useState(
    new Animated.Value(10),
  );
  const [cardTransitionSAnimation, setTransitionSMoveAnimation] = useState(
    new Animated.Value(1),
  );

  const cardRotate = () => {
    Animated.parallel([
      Animated.timing(cardRotateAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(cardMoveAnimation, {
        toValue: -214,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(cardMoveSAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(f => {
      var size = images.length - 1;
      const s1 = selected;
      const s2 = selected + 1 > size ? selected - size : selected + 1;
      const s3 = selected + 2 > size ? selected + 1 - size : selected + 2;
      setCards({
        c1: {
          bg: images[s1],
        },
        c2: {
          bg: images[s2],
        },
        c3: {
          bg: images[s3],
        },
      });
      console.log(selected);

      setSelected(selected === size ? 0 : selected + 1);

      Animated.sequence([
        Animated.timing(cardMoveAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(cardRotateAnimation, {
          toValue: 40,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(cardMoveSAnimation, {
          toValue: 40,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(cardTransitionSAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.parallel([
          Animated.timing(cardTransitionSAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(cardMoveSAnimation, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ]).start(f => {
        console.log(f);
      });
    });
  };

  const cardJumping = () => {
    Animated.stagger(300, [
      Animated.sequence([
        Animated.timing(cardJumpingAnimation1, {
          toValue: 5,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(cardJumpingAnimation1, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.timing(cardJumpingAnimation2, {
          toValue: 15,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(cardJumpingAnimation2, {
          toValue: 10,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.timing(cardJumpingAnimation3, {
          toValue: 25,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(cardJumpingAnimation3, {
          toValue: 20,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Toolbar />
      <View style={styles.pairLabelContainer}>
        <PairLabel />
      </View>
      <GestureRecognizer
        onSwipeUp={() => {
          console.log('SWIPE UP');
          cardRotate();
          cardJumping();
        }}
        onSwipeDown={() => console.log('SWIPE DOWN')}
        style={styles.cardsContainer}>
        <View
          style={{
            width: '80%',
            height: 220,
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              backgroundColor: '#f7f7f7',
              width: '90%',
              height: 200,
              borderRadius: 12,
              position: 'absolute',
              transform: [{translateY: cardJumpingAnimation3}],
              borderColor: '#f7f7f7',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.4,
              marginBottom: 10,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#fff',
              width: '95%',
              height: 200,
              borderRadius: 12,
              position: 'absolute',
              transform: [{translateY: cardJumpingAnimation2}],
              borderColor: '#f7f7f7',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.4,
              marginBottom: 10,
            }}
          />
          <Animated.View
            style={{
              height: 200,
              borderRadius: 20,
              position: 'absolute',
              transform: [{translateY: cardJumpingAnimation1}],
              overflow: 'hidden',
            }}>
            <SharedElement id="CARD">
              <CreditCard
                width={windowWidth * 0.8}
                height={200}
                imageFront={cards.c1.bg}
                mainContainerStyle={{borderRadius: 20}}
              />
            </SharedElement>
          </Animated.View>
        </View>
        <View
          style={{
            width: '80%',
            height: 210,
            marginTop: 0,
            borderRadius: 20,
          }}>
          <Animated.View
            style={{
              width: '100%',
              height: 200,
              borderRadius: 20,
              transform: [{rotateX: '40deg'}, {translateY: cardMoveSAnimation}],
              opacity: cardTransitionSAnimation,
              position: 'absolute',
              overflow: 'hidden',
            }}>
            <CreditCard
              width={windowWidth * 0.8}
              height={200}
              imageFront={cards.c3.bg}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: 200,
              borderRadius: 20,
              transform: [
                {
                  rotateX: cardRotateAnimation.interpolate({
                    inputRange: [0, 40],
                    outputRange: ['0deg', '40deg'],
                  }),
                },
                {translateY: cardMoveAnimation},
              ],
              overflow: 'hidden',
            }}>
            <CreditCard
              width={windowWidth * 0.8}
              height={200}
              imageFront={cards.c2.bg}
            />
          </Animated.View>
        </View>
      </GestureRecognizer>
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

export default CardsScreen;
