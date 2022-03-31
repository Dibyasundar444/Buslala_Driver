import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from '@react-native-firebase/storage';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import Background from "../utils/Background";
import { fontColor, primary } from "../utils/Color";
import Header from "../utils/Header";
import axios from "axios";
import { BASE_URL } from "../config";

export default function ProfileScreen({navigation,route}){

    const preData = route.params;

    const [pageNo, setPageNo] = useState('1');
    const [name, setName] = useState(preData.user.name);
    const [license, setLicense] = useState(preData.user.doc_number ? preData.user.doc_number : '');
    const [url, setUrl] = useState('');
    const [process, setProcess] = useState('');
    const [userData, setUserData] = useState({});
    const [imagePath, setImagePath] = useState(preData.user.doc_image ? preData.user.doc_image : '');
    const [exp, setExp] = useState(preData.user.total_exp ? preData.user.total_exp.toString() : '');
    const [address, setAddress] = useState(preData.user.address ? preData.user.address : '');
    const [phoneNo, setPhoneno] = useState(preData.user.phone ? preData.user.phone : '');
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        getUserData();
    },[]);
    
    if(success){
        setTimeout(()=>{
            setSuccess(false);
        },3500)
    };
    
    if(serverError){
        setTimeout(()=>{
            setServerError(false);
        },3500)
    };


    const getUserData=async()=>{
        try{
            const USER_OBJ = await AsyncStorage.getItem('user');
            const PARSED_OBJ = JSON.parse(USER_OBJ);
            setUserData(PARSED_OBJ.user);
            console.log(PARSED_OBJ);
        }
        catch(err){
            console.log("storage err: ",err);
        }
    };

    const openLibrary = async () => {
        const options = {
          storageOptions: {
            path: 'images',
            mediaType: 'photo',
          },
          includeBase64: true,
        };
        launchImageLibrary(options, resp => {
            if (resp.didCancel) {
                console.log('Canceled');
            } else if (resp.error) {
                console.log('Error: ', resp.error);
            } else {
                const imgData = resp.assets[0];
                setImagePath(imgData.uri);
                try {
                    const task = storage()
                        .ref('DRIVER/license/' + imgData.fileName)
                        .putString(imgData.base64, 'base64');
                    task.on(
                        'state_changed',
                        function (snapshot) {
                            const rate = Math.floor(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                            );
                            setProcess(`${rate}%`);
                        },
                        function (err) {
                            console.log(err);
                        },
                        function () {
                            task.snapshot.ref.getDownloadURL().then(function (url) {
                            setUrl(url);
                            });
                        },
                    );
                    task.then(() => {
                        console.log('PDF uploaded to the bucket!');
                    });
                } 
                catch (e) {
                    console.log("firebase error",e);
                }
            }
        });
    };

    const submit=()=>{
        setLoading(true);
        let axiosConfig = {
            headers:{
                Authorization: preData.token
            }
        };
        let body = {
            name: name,
            number: license,
            doc_number: license,
            doc_image: url,
            total_exp: Number(exp),
            address: address,
            phone: phoneNo        
        };
        axios.patch(`${BASE_URL}/api/admin/updatealldriver/${preData.user._id}`,body,axiosConfig)
        .then(async resp=>{
            getUserData();
            let UPDATED_USERDATA = {
                "token": preData.token,
                "user": {
                    "_id": preData.user._id,
                    "email": preData.user.email,
                    "name": name,
                    "number": license,
                    "address": address,
                    "doc_number": license,
                    "doc_image": url,
                    "phone": phoneNo,
                    "total_exp": exp
                }
            };
            await AsyncStorage.setItem('user',JSON.stringify(UPDATED_USERDATA))
            .then(()=>{
                getUserData();
            })
            .catch(err=>{
                console.log("get updated userdata err:",err);
            });
            setLoading(false);
            setSuccess(true);
        })
        .catch(err=>{
            setLoading(false);
            setServerError(true);
            console.log("server err:",err);
        });
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
                    isPerson={false}
                    back={()=>navigation.goBack()}
                    isLogOut={true}
                />
                <View style={{width:"100%"}}>
                    <View style={{alignItems:"center",top:-30}}>
                        <Text style={{fontSize:22,color:"#fff",letterSpacing:1}}>Hello</Text>
                        <Text style={{fontSize:26,color:fontColor,letterSpacing:1}}>{userData.name}!</Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:20,paddingBottom:250,paddingTop:10}}
                    >
                        <View style={styles.card}>
                            <View
                                style={{alignItems:"center"}}
                            >
                                {
                                    pageNo === '1' ? 
                                    <>
                                        <Text style={{color:"#000",fontWeight:"700"}}>Name :</Text>
                                        <TextInput 
                                            style={styles.textInput}
                                            placeholder={userData.name}
                                            placeholderTextColor={primary}
                                            value={name}
                                            onChangeText={(val)=>setName(val)}
                                        />
                                        <Text style={{color:"#000",fontWeight:"700"}}>Driving License Details :</Text>
                                        <TextInput 
                                            style={styles.textInput}
                                            placeholder={userData.doc_number ? userData.doc_number : "Enter License Number..."}
                                            placeholderTextColor={primary}
                                            value={license}
                                            onChangeText={(val)=>setLicense(val)}
                                        />
                                        <TouchableOpacity
                                            style={[styles.textInput,{paddingVertical:10,alignItems:"center"}]}
                                            activeOpacity={0.8}
                                            onPress={openLibrary}
                                        >
                                            <View style={{flexDirection:"row",alignItems:"flex-end"}}>
                                                <MaterialIcons name="touch-app" color="gray" size={20} style={{left:-10}} />
                                                <Text style={{color:primary,fontSize:13,fontWeight:"700"}}>Upload Driving License</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            imagePath ? 
                                            <View 
                                                style={{
                                                    height:100,
                                                    width:"60%",
                                                }}
                                            >
                                                <Image 
                                                    source={{uri:imagePath}}
                                                    style={{
                                                        height:"100%",
                                                        width:"100%"
                                                    }}
                                                />
                                            </View>
                                            :
                                            // <Image 
                                            //     source={require('../assets/no-img.png')}
                                            //     style={{
                                            //         height:"100%",
                                            //         width:"100%",
                                            //         resizeMode:"contain"
                                            //     }}
                                            // />
                                            null
                                        }
                                        <Text style={{color:primary,marginTop:5}}>{process}</Text>
                                        <AntDesign 
                                            name="rightcircle" 
                                            size={40} 
                                            color={primary} 
                                            style={{marginVertical:20}}
                                            onPress={()=>setPageNo('2')}
                                        />
                                    </>
                                    :
                                    <>
                                        <Text style={{color:"#000",fontWeight:"700"}}>Phone Number :</Text>
                                        <TextInput 
                                            style={styles.textInput}
                                            placeholder={userData.phoneNo ? userData.phoneNo : "Enter Your Phone Number..."}
                                            placeholderTextColor={primary}
                                            value={phoneNo}
                                            onChangeText={(val)=>setPhoneno(val)}
                                            keyboardType="number-pad"
                                            maxLength={10}
                                        />
                                        <Text style={{color:"#000",fontWeight:"700"}}>Total Experience : (in years)</Text>
                                        <TextInput 
                                            style={styles.textInput}
                                            placeholder={userData.total_exp ? userData.total_exp.toString() : "Enter Your Experience..."}
                                            placeholderTextColor={primary}
                                            value={exp}
                                            onChangeText={(val)=>setExp(val)}
                                        />
                                        <Text style={{color:"#000",fontWeight:"700"}}>Address :</Text>
                                        <TextInput 
                                            style={styles.textInputAddress}
                                            placeholder={userData.address ? userData.address : "Enter Your Address..."}
                                            placeholderTextColor={primary}
                                            value={address}
                                            onChangeText={(val)=>setAddress(val)}
                                        />
                                        {
                                            loading ? <ActivityIndicator size={30} color={primary} style={{}} />
                                            :
                                            success ?
                                            <Text style={{color:"green",fontSize:12}}>Successfully Updated</Text>
                                            :
                                            serverError ?
                                            <Text style={{color:"red",fontSize:12}}>Server Error, Please Try Again Later</Text>
                                            :
                                            <View 
                                                style={{
                                                    flexDirection:"row",
                                                    alignItems:"center",
                                                    marginTop:20,
                                                    marginBottom:10,
                                                    width:"80%",
                                                    justifyContent:"space-between"
                                                }}
                                            >
                                                <AntDesign 
                                                    name="leftcircle" 
                                                    size={40} 
                                                    color={primary} 
                                                    onPress={()=>setPageNo('1')}
                                                />
                                                <TouchableOpacity
                                                    style={styles.submitBtn}
                                                    activeOpacity={0.7}
                                                    onPress={submit}
                                                >
                                                    <Text style={{color:"#fff",fontWeight:"500"}}>Submit</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

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
        marginBottom:10,
        // height:200
        
    },
    textInput: {
        backgroundColor:'rgba(0,0,0,0.16)',
        width:"80%",
        borderRadius:5,
        marginVertical:10,
        color:"#000",
        textAlign:"center",
        fontWeight:"600"
    },
    textInputAddress: {
        backgroundColor:'rgba(0,0,0,0.16)',
        width:"80%",
        borderRadius:5,
        marginVertical:10,
        color:"#000",
        // textAlign:"center",
        // fontWeight:"600",
        paddingTop:0,
        paddingLeft:10,
        height:70,
        flexWrap:"wrap"
    },
    submitBtn: {
        backgroundColor:primary,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5,
        elevation:5,
    }
})