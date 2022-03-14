import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';


export default function Background({BACKCOLOR,HEIGHT,borderBottomRightRadius,borderBottomLeftRadius,scaleX}) {
  return (
    <View 
        style={{
            backgroundColor: BACKCOLOR,
            height: HEIGHT,
            borderBottomLeftRadius:borderBottomLeftRadius,
            borderBottomRightRadius:borderBottomRightRadius,
            transform: [
                {scaleX: scaleX}
            ]
        }} 
    />
  );
}