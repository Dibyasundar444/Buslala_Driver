import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { secondary } from "../utils/Color";

export default function MyCard(){
    return(
        <TouchableOpacity 
            style={styles.card}
            activeOpacity={1}
        >
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"

                }}
            >
                <View>
                    <Text style={{color:"#000",letterSpacing:1,fontSize:13,fontWeight:"500"}}>Company Name Travels</Text>
                    <Text style={{color:"gray",fontSize:11}}>AC Seater / Sleeper (2+1)</Text>
                    <Text style={{color:"#000",fontSize:11}}>20 Oct, Friday</Text>
                </View>
                <View style={{alignItems:"center"}}>
                    <Text style={{color:'#000',fontSize:13}}>HYD</Text>
                    <MaterialIcons name="swap-vert" color={secondary} size={30} />
                    <Text style={{color:'#000',fontSize:13}}>MAS</Text>
                </View>
            </View>
            <View 
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:'space-between',
                    marginTop:20,
                    paddingBottom:10,
                    marginLeft:10
                }}>
                    <View style={{alignItems:"center"}}>
                        <MaterialIcons name="airline-seat-recline-normal" color="#000" size={22} />
                        <Text style={{color:"#000"}}>03</Text>
                    </View>
                    <View 
                        style={{
                            borderWidth:0.5,
                            height:"100%",
                            borderColor:"gray",
                            backgroundColor:"gray"
                        }} 
                    />
                    <View style={{alignItems:"center"}}>
                        <MaterialIcons name="airline-seat-flat" color="#000" size={22} />
                        <Text style={{color:"#000"}}>10</Text>
                    </View>
                    <View 
                        style={{
                            borderWidth:0.5,
                            height:"100%",
                            borderColor:"gray",
                            backgroundColor:"gray"
                        }} 
                    />
                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={{color:"#000",fontSize:16,fontWeight:"500"}}>33</Text>
                            <Text style={{color:"#000",fontSize:12}}> out of 46</Text>
                        </View>
                        <Text style={{color:"#000",fontSize:11}}>13 seats left</Text>
                    </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor:"#fff",
        elevation:9,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        marginBottom:10
    }
})