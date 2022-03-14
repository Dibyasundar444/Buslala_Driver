import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Header({isPerson,account,bell,back}) {
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
                style={styles.leftBtn}
                activeOpacity={0.8}
                onPress={back}
            >
                <AntDesign name='arrowleft' color="#fff" size={18} />
                <Text style={{color:"#fff",marginLeft:15,fontSize:13}}>Today's Trip</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity
            style={styles.person}
            activeOpacity={0.8}
            onPress={bell}
        >
            <Feather name="bell" color="#fff" size={22} />
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
    }
})