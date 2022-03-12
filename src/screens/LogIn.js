import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { primary, secondary } from '../utils/Color';

export default function LogIn({navigation}){
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
              />
            </View>
            <Text style={{color:"#000",marginTop:20,fontSize:13}}>Password</Text>
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
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={()=>navigation.navigate("Buses")}
          >
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>
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
    marginVertical:40,
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