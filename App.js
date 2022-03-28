import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BusesScreen from './src/screens/BusesScreen';
import LogIn from './src/screens/LogIn';
import TodaysTrip from './src/screens/TodaysTrip';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationPage from './src/screens/NotificationScreen';
import { primary } from './src/utils/Color';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App(){

  const [isUser, setIsUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    requestUserPermission();
    getUser();
    setTimeout(()=>{
      setAppIsReady(true);
    },2500);

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const preMsg = await AsyncStorage.getItem('notifications');
      const parse = JSON.parse(preMsg);
      if (parse) {
        const messageArray = parse;
        messageArray.push(remoteMessage);
        // console.log('arr', messageArray);
        await AsyncStorage.setItem(
          'notifications',
          JSON.stringify(messageArray),
        );
      } else {
        const messageArray = [remoteMessage];
        await AsyncStorage.setItem(
          'notifications',
          JSON.stringify(messageArray)
        );
      }
    });
    return unsubscribe;
  }, []);
  

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getUser=async()=>{
    try{
      const USER_OBJ = await AsyncStorage.getItem('user');
      const PARSED_OBJ = JSON.parse(USER_OBJ);
      PARSED_OBJ != null ?
      setIsUser(true)
      :
      setIsUser(false)
    }
    catch(err){
      console.log("User_Storage error:", err);
    }
  };

  if(!appIsReady){
    return(
      <WelcomeScreen />
    );
  }

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown:false}} 
        initialRouteName={isUser ? "Buses": "LogIn"}
      >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Buses" component={BusesScreen} />
        <Stack.Screen name="TodaysTrip" component={TodaysTrip} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="NotificationPage" component={NotificationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});