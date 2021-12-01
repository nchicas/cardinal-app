import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Toolbar = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.borderItem}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.centralItem}>Cardinal</Text>
      <Text style={styles.borderItem}></Text>
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
    width: 70,
    textAlign: 'center',
    fontSize: 22,
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
