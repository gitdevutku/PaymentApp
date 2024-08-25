import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Header = ({title, icon, onPress}) => {
  return (
    <View style={styles.Header}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.backBtn}
        underlayColor="#f2f2f2">
        <Image style={styles.back} source={icon}></Image>
      </TouchableOpacity>

      <Text style={[styles.title, {marginLeft: 10}]}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    elevation: 5,
    alignItems: 'center',
    paddingLeft: 20,
  },
  back: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 5,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 0,
  },
});
