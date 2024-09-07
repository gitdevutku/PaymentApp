import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from "../components/Header.js"

const Coffee = ({navigation}) => {
  const handleBuy = () => {
    navigation.navigate('QrSendTurkishLira', {
      recipientAddress: '0xF6937c1dDD21fd9539F3B18aB74fcBE69328456C', // replace with actual recipient address
      amount: '10', // the amount in TRYS
    });
  };
  return (
  <View>
  <Header
          title={'QR Code Payment System'}
          icon={require('../images/back.png')}
          onPress={() => navigation.goBack()}
        />
    <View style={styles.container}>
      <Text style={styles.coffeeSign}>Coffee</Text>
      <Image
        style={styles.coffeePng}
        source={require('../images/coffee.png')}></Image>
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyText}>BUY 10 TRYS</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
  },
  coffeePng: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  coffeeSign: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '800',
    color: '#654321',
  },
  buyButton: {
    width: '50%',
    padding: 10,
    backgroundColor: '#EEEEAA',
    alignSelf: 'center',
    marginBottom: 40,
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 4,
  },
  buyText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#654321',
  },
});
export default Coffee;
