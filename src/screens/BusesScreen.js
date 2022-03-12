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

export default function BusesScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer} />
            <View style={styles.body}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.person}
                    >
                        <Octicons name="person" color="#fff" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.person}
                    >
                        <Feather name="bell" color="#fff" size={22} />
                    </TouchableOpacity>
                </View>
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
                        <MyCard />
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
    headerContainer: {
        backgroundColor: primary,
        height: "41%",
        borderBottomLeftRadius:200,
        borderBottomRightRadius:200,
        transform: [
            {scaleX: 2}
        ]
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
    header: {
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        width:"90%",
        marginTop:50,
        marginBottom:30
    },
    person: {
        justifyContent:"center",
        alignItems:"center",
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:'rgba(0,0,0,0.3)'
    },
})