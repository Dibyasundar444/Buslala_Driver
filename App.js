import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusesScreen from './src/screens/BusesScreen';
import LogIn from './src/screens/LogIn';
import TodaysTrip from './src/screens/TodaysTrip';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Buses" component={BusesScreen} />
        <Stack.Screen name="TodaysTrip" component={TodaysTrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});