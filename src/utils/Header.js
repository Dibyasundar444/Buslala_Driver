import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

export default function Header({isPerson,account,back,backText}) {

    const navigation = useNavigation();

    const LOGOUT=async()=>{
        await AsyncStorage.removeItem('user')
        .then(()=>{
            navigation.dispatch(
                StackActions.replace("LogIn")
            );
        })
        .catch(err=>console.log('logout err:',err))
    };

    const logout_alert=()=>{
        Alert.alert(
            "Logging out!",
            "Are you sure?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: LOGOUT }
            ]
        );
    };


  return (
    <View style={styles.header}>
        {
            isPerson ? 
            <TouchableOpacity
                style={styles.person}
                activeOpacity={0.8}
                onPress={account}
            >
                <Octicons name="person" color="#fff" size={22} />
            </TouchableOpacity> 
            :
            <TouchableOpacity
                style={backText ? styles.leftBtn : styles.person}
                activeOpacity={0.8}
                onPress={back}
            >
                <AntDesign name='arrowleft' color="#fff" size={18} />
                {
                    backText && <Text style={{color:"#fff",marginLeft:15,fontSize:13}}>{backText}</Text>
                }
            </TouchableOpacity>
        }
        <TouchableOpacity
            style={styles.person}
            activeOpacity={0.8}
            onPress={logout_alert}
        >
            <AntDesign name="logout" color="#fff" size={22} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    leftBtn: {
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,0.3)',
        paddingHorizontal:20,
        height:50,
        borderRadius:30
    },
})