import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ConfirmDialog = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Floating Card</Text>
      <Text style={styles.cardContent}>
        This is a floating card with shadow effect.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default ConfirmDialog;
