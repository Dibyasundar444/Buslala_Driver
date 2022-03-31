import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from "@react-navigation/native";
import axios from 'axios';
import { BASE_URL } from '../config';
import { primary, secondary } from '../utils/Color';

export default function LogIn({navigation}){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);
  const [userErrorText, setUserErrortext] = useState('');
  const [serverError, setServerError] = useState(false);

  const errorHandler1=()=>{
    if(!email){
      setInput1Error(true);
    }
    else setInput1Error(false);
  };
  const errorHandler2=()=>{
    if(!email){
      setInput2Error(true);
    }
    else setInput2Error(false);
  };

  const LOGIN = () => {
    setLoading1(true);
    setServerError(false);
    setUserErrortext('');
    let body = {
      "email": email,
      "password": password
    }
    axios.post(`${BASE_URL}/api/admin/driverLogin`,body)
    .then(async resp=>{
      setLoading1(false);
      await AsyncStorage.setItem('user',JSON.stringify(resp.data));
      navigation.dispatch(
        StackActions.replace("Buses")
      );
    })
    .catch(err=>{
      setLoading1(false);
      if(err.response.data.message){
        setUserErrortext(err.response.data.message);
        setServerError(false);
      }
      else {
        setServerError(true);
        setUserErrortext('');
      }
        console.log("server err",err);
    })
  };

  const ErrorInput=({text})=>(
    <Text style={{color:"red",fontSize:11,textAlign:"center",marginTop:5}}>{text}</Text>
  );


  return(
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../assets/logo.png')} style={styles.img} />
      </View>
      <ScrollView style={styles.body} 
        contentContainerStyle={{alignItems:"center"}}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.loginText}>Login</Text>
        <Text style={{color:"#000"}}>Enter Id and Password here.</Text>
        <View style={{width:"100%",alignItems:"center",marginTop:20}}>
          <View style={{width:'80%'}}>
            <Text style={{color:"#000",fontSize:13}}>User ID</Text>
            <View style={styles.inputView}>
              <Ionicons 
                name='person-outline' 
                color="#000" 
                style={{marginHorizontal:15}} 
                size={16} 
              />
              <TextInput 
                placeholder='Enter your Id'
                placeholderTextColor="gray"
                style={styles.textInput}
                value={email}
                onChangeText={(val)=>setEmail(val)}
                onBlur={errorHandler1}
              />
            </View>
            {
              input1Error && <ErrorInput text="Please enter your ID" />
            }
            <Text style={{color:"#000",marginTop:input1Error?0:20,fontSize:13}}>Password</Text>
            <View style={styles.inputView}>
              <MaterialCommunityIcons 
                name='form-textbox-password' 
                color="#000" 
                style={{marginHorizontal:15}} 
                size={16} 
              />
              <TextInput 
                placeholder='Enter your Password'
                placeholderTextColor="gray"
                style={styles.textInput}
                value={password}
                onChangeText={(val)=>setPassword(val)}
                onBlur={errorHandler2}
              />
            </View>
            {
              input2Error && <ErrorInput text="Please enter Password" />
            }
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={LOGIN}
          >
            {
              loading1 ? <ActivityIndicator size={26} color="#fff" /> : <Text style={styles.submitText}>Login</Text>
            }
          </TouchableOpacity>
          <View style={{marginBottom:10}}>
            {
              serverError && <ErrorInput text={`Error from server\nPlease try again later`} />
            }
            {
              userErrorText !=="" && <ErrorInput text={userErrorText} />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:primary,
    alignItems:'center'
  },
  body: {
    flex:1,
    width:"100%",
    backgroundColor:"#fff",
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  logo: {
    marginVertical:40,
    width:"100%",
    alignItems:"center"

  },
  img: {
    width: 200,
    height: 200,
    resizeMode:"contain"
  },
  loginText: {
    color:"#000",
    textTransform:"uppercase",
    fontWeight:"600",
    fontSize:16,
    marginTop:30,
    marginBottom:20
  },
  inputView: {
    backgroundColor:"#fff",
    elevation:9,
    borderRadius: 10,
    marginTop:5,
    flexDirection:"row",
    alignItems:"center",
  },
  textInput: {
    color:"#000",
    width:"100%",
    borderRadius:10,
    paddingLeft:0
  },
  btn: {
    width: "50%",
    backgroundColor: secondary,
    marginTop:40,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:10,
    borderRadius:10
  },
  submitText: {
    color:"#fff",
    fontSize:16,
    fontWeight:'600',
    letterSpacing:1
  }
});