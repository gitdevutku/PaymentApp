import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import TurkishLiraScreen from './screens/TurkishLira';
import SciCoinScreen from './screens/SciCoin';
import SettingsScreen from './screens/Settings';
import AboutAppScreen from './screens/About';
import QrTxTurkishLira from './screens/QrSendTurkishLira';
import QrReceiveTurkishLira from './screens/QrReceiveTurkishLira';
import QrSendTurkishLira from './screens/QrSendTurkishLira';
import Success from './screens/Success';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="TurkishLira"
          component={TurkishLiraScreen}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="SciCoin"
          component={SciCoinScreen}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="AboutApp"
          component={AboutAppScreen}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="QrSendTurkishLira"
          component={QrSendTurkishLira}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="QrReceiveTurkishLira"
          component={QrReceiveTurkishLira}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}} // Hide the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
