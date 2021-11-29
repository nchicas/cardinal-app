import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PairLabel = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{}}>
          <Text style={styles.value}>
            <Text>4532</Text>
            <Text style={{fontSize: 10}}> USD</Text>
          </Text>
          <Text style={styles.title}>BALANCE</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.value}>
            <Text>Cesar Callejas</Text>
          </Text>
          <Text style={styles.title}>BALANCE</Text>
        </View>
      </View>
      <View style={{flex: 0}}>
        <View style={{}}>
          <Text style={styles.value}>
            <Text>04/22</Text>
          </Text>
          <Text style={styles.title}>EXPIRES</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.value}>
            <Text>345</Text>
          </Text>
          <Text style={styles.title}>CVC</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 30,
  },
  value: {
    fontSize: 28,
    color: '#1a2332',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#413977',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
  },
});

export default PairLabel;
