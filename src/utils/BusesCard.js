import React, {
    useState
} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { secondary, fontColor } from "./Color";
import St_Line from "./St_Line";

export default function BusesCard(
    {bus_model,bus_name,total_seat}
    ){

    return(
        <>
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"

                }}
            >
                <View>
                    <Text 
                        style={{
                            color:"#000",
                            letterSpacing:1,
                            fontSize:13,
                            fontWeight:"500",
                            left:-15,
                            textTransform:"capitalize"
                        }}
                    >   {bus_name}
                    </Text>
                    <Text style={{color:"gray",fontSize:11}}>{bus_model}</Text>
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
                }}
            >
                <View style={{alignItems:"center"}}>
                    <MaterialIcons name="airline-seat-recline-normal" color="#000" size={22} />
                    <Text style={{color:"#000"}}>03</Text>
                </View>
                <St_Line 
                    height="100%"
                    borderWidth={0.5}
                    borderColor="#aaa"
                    backgroundColor="#aaa"
                />
                <View style={{alignItems:"center"}}>
                    <MaterialIcons name="airline-seat-flat" color="#000" size={22} />
                    <Text style={{color:"#000"}}>10</Text>
                </View>
                <St_Line 
                    height="100%"
                    borderWidth={0.5}
                    borderColor="#aaa"
                    backgroundColor="#aaa"
                />
                <View style={{alignItems:"center"}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{color:"#000",fontSize:16,fontWeight:"500"}}>33</Text>
                        <Text style={{color:"#000",fontSize:12}}> out of {total_seat}</Text>
                    </View>
                    <Text style={{color:"#000",fontSize:11}}>13 seats left</Text>
                </View>
            </View>
        </>
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
    },
    upperView2: {
        height: 65,
        width: 25,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 5
    },
    lowerSeat: {
        height:30,
        width:25,
        borderRadius:5,
        marginBottom:5
    },
    btn: {
        backgroundColor:secondary,
        width: "55%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        paddingVertical:8,
        marginBottom:10
    },
    remainderTxt: {
        color:"#000",
        letterSpacing:1,
        fontWeight:'500',
        fontSize:11,
        bottom:-2
    }
})