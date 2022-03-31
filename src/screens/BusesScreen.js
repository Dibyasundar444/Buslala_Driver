import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import { fontColor, primary } from "../utils/Color";
import Background from "../utils/Background";
import Header from "../utils/Header";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BusesCard from "../utils/BusesCard";

export default function BusesScreen({navigation}){

    const isFocused = useIsFocused();

    const [userData, setUserData] = useState({});
    const [busData, setBusData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [totalResponse, setTotalResponse] = useState(null);

    useEffect(()=>{
        if(isFocused){
            getAllBusDetails();
        }
    },[isFocused]);


    const getAllBusDetails=async()=>{
        const USER_OBJ = await AsyncStorage.getItem('user');
        const PARSED_OBJ = JSON.parse(USER_OBJ);
        setTotalResponse(PARSED_OBJ);
        setUserData(PARSED_OBJ.user);
        let axiosConfig = {
            headers:{
                Authorization: PARSED_OBJ.token
            }
        };
        axios.get(`${BASE_URL}/api/admin/busDetails`,axiosConfig)
        .then(resp=>{
            setBusData(resp.data.data);
            setLoading(false);
        })
        .catch(err=>{
            setApiError(true);
            console.log("server err: ",err);
        })
    };


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
                    account={()=>navigation.navigate("ProfileScreen",totalResponse)}
                    LOGOUT={()=>{}}
                />
                <View
                    style={{width:'100%'}}
                >
                    <ScrollView 
                        contentContainerStyle={{paddingHorizontal:15,paddingBottom:250}}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{marginLeft:20}}>
                            <Text style={{fontSize:22,color:"#fff",letterSpacing:1}}>Hello</Text>
                            <Text style={{fontSize:26,color:fontColor,letterSpacing:1}}>{userData.name}!</Text>
                            <Text style={{color:"#fff",marginVertical:10}}>Where are you heading today?</Text>
                        </View>   
                        {
                            loading ? <ActivityIndicator size={40} style={{marginTop:80}} />
                            :
                            busData.map((item)=>(
                                <TouchableOpacity 
                                    style={styles.card}
                                    activeOpacity={1}
                                    onPress={()=>navigation.navigate('TodaysTrip',item)}
                                    key={item._id}
                                >
                                    <BusesCard 
                                        bus_name={item.name}
                                        bus_model={item.bus_model}
                                        total_seat={item.seats.seater+item.seats.sleeper}
                                    />
                                </TouchableOpacity>
                            ))
                        }                
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
    card: {
        backgroundColor:"#fff",
        elevation:9,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        marginBottom:10
    },
})