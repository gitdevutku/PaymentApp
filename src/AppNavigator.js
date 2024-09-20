import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import TurkishLiraScreen from './screens/TurkishLira';
import SciCoinScreen from './screens/SciCoin';
import SettingsScreen from './screens/Settings';
import AboutAppScreen from './screens/About';
import QrReceiveTurkishLira from './screens/QrReceiveTurkishLira';
import QrSendTurkishLira from './screens/QrSendTurkishLira';
import Success from './screens/Success';
import Coffee from './screens/Coffee';
import Splash from './screens/Splash';
import LoginPage from './screens/Login';
import SciCoin from './screens/SciCoin';
import QrSendSciCoin from './screens/QrSendSCICoin';
import QrReceiveSCI from './screens/QrReceiveSCI';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{headerShown: false}} // Hide the header
        />
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
        <Stack.Screen
          name="Coffee"
          component={Coffee}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="QrSendSciCoin"
          component={QrSendSciCoin}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="QrReceiveSciCoin"
          component={QrReceiveSCI}
          options={{headerShown: false}} // Hide the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
