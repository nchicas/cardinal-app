import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Toolbar = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.borderItem}>Done</Text>
      </TouchableOpacity>
      <Text style={styles.centralItem}>Cardinal</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateCardScreen')}>
        <Text style={styles.borderItem}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7fbff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  borderItem: {
    width: 60,
    textAlign: 'center',
    fontSize: 24,
    color: '#2d2c5f',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
  },
  centralItem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    color: '#1d1f23',
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
  },
});

export default Toolbar;
