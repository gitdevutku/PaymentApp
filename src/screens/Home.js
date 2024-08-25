import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../components/Header';

// Component to render each item in the list
const Item = ({item, onPress}) => (
  <View style={styles.item}>
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Text style={styles.cardText}>{item.id}</Text>
    </TouchableOpacity>
  </View>
);

// Home component
const Home = ({navigation}) => {
  const data = [
    {id: 'Turkish Lira'},
    {id: 'SCI Coin'},
    {id: 'Settings'},
    {id: 'About App'},
  ];

  const handlePress = item => {
    switch (item.id) {
      case 'Turkish Lira':
        navigation.navigate('TurkishLira');
        break;
      case 'SCI Coin':
        navigation.navigate('SciCoin');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      case 'About App':
        navigation.navigate('AboutApp');
        break;
      default:
        Alert.alert('Error', 'Unknown item selected');
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'PayApp'} icon={require('../images/splash.png')} />
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} onPress={handlePress} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#aeae',
  },
  item: {
    margin: 10,
    width: '90%',
  },
  card: {
    backgroundColor: '#eea',
    marginLeft: 20,
    padding: 10,
    borderRadius: 20,
    width: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default Home;
