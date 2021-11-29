import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Toolbar2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.borderItem}></Text>
      <Text style={styles.centralItem}>My Account</Text>
      <View
        style={{
          width: 40,
          height: 40,
          borderWidth: 3,
          borderColor: '#4C327E',
          overflow: 'hidden',
          borderRadius: 15,
          marginLeft: 20,
        }}>
        <Image
          source={require('../assets/rostro.jpg')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
      </View>
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

export default Toolbar2;
