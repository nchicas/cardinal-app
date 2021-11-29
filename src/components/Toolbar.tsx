import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Toolbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.borderItem}>Done</Text>
      <Text style={styles.centralItem}>Cardinal</Text>
      <Text style={styles.borderItem}>+</Text>
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
