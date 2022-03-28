import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { primary } from '../utils/Color';

export default function WelcomeScreen() {
  return (
    <View 
        style={{
            flex:1,
            justifyContent:"center",
            backgroundColor:primary
        }}
    >
        <ActivityIndicator size={50} color="#fff" />
    </View>
  )
}