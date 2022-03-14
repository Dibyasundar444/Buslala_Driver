import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function St_Line({height,borderWidth,borderColor,top,backgroundColor,width}) {
  return (
    <View 
        style={{
            height:height,
            borderWidth:borderWidth,
            borderColor:borderColor,
            backgroundColor:backgroundColor,
            top:top,
            width:width
        }}
    />
  );
}