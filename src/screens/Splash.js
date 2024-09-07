import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/splash.png')}
        style={styles.logo}></Image>
      <Text style={styles.title}>Payment App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90EE90',
    borderRadius: 14,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    color: 'green',
    fontWeight: '800',
    marginTop: 20,
  },
});
