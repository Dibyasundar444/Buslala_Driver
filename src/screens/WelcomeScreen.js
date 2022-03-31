import { View, Image } from 'react-native';
import React from 'react';
import { primary } from '../utils/Color';

export default function WelcomeScreen() {
  return (
    <View 
        style={{
            flex:1,
            justifyContent:"center",
            backgroundColor:primary,
            alignItems:"center"
        }}
    >
        <View 
          style={{
            height: 100,
            width: "80%"
          }}
        >
          <Image 
            source={require('../assets/logo.png')}
            style={{
              height:"100%",
              width:"100%",
              resizeMode:"contain"
            }}
          />
        </View>
    </View>
  );
}