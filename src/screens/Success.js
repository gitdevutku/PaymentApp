import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const Success = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.checked}
        source={require('../images/checked.png')}></Image>
      <Text style={styles.text}>Transaction Completed</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.checkedBtn}>
        <Text style={styles.checkedBtnText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeae',
    justifyContent: 'center',
  },
  section: {
    justifyContent: 'center',
    marginTop: 100,
  },
  checked: {
    height: 200,
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700',
  },
  checkedBtn: {
    width: 200,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#afaf',
  },
  checkedBtnText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
export default Success;
