import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';

import { fontColor, primary } from "../utils/Color";
import MyCard from "../utils/MyCard";
import Background from "../utils/Background";
import Header from "../utils/Header";

export default function BusesScreen({navigation}){
    return(
        <View style={styles.container}>
            <Background 
                BACKCOLOR={primary}
                HEIGHT="40%"
                borderBottomLeftRadius={200}
                borderBottomRightRadius={200}
                scaleX={2}
            />
            <View style={styles.body}>
                <Header 
                    isPerson={true}
                />
                <View
                    style={{width:'100%'}}
                >
                    <View style={{marginLeft:20}}>
                        <Text style={{fontSize:22,color:"#fff",letterSpacing:1}}>Hello</Text>
                        <Text style={{fontSize:26,color:fontColor,letterSpacing:1}}>Sampath!</Text>
                        <Text style={{color:"#fff",marginVertical:10}}>Where are you heading today?</Text>
                    </View>
                    <ScrollView 
                        contentContainerStyle={{paddingHorizontal:15,paddingBottom:300}}
                        showsVerticalScrollIndicator={false}
                    >
                        <MyCard 
                            NAV={()=>navigation.navigate('TodaysTrip')}
                        />
                        <MyCard />
                        <MyCard />
                        <MyCard />
                        <MyCard />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },
    body: {
        position:"absolute",
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundColor:"transparent",
        alignItems:"center"
    },
})