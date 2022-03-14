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
import Ionicons from 'react-native-vector-icons/Ionicons';

import { secondary, fontColor } from "../utils/Color";
import St_Line from "./St_Line";

const DUMMYDATA_UPPER=[{id:0,status:0},{id:1,status:1},{id:2,status:0},{id:3,status:1},{id:4,status:0},
    {id:5,status:0},{id:6,status:1},{id:7,status:0},{id:8,status:0},{id:9,status:0},{id:10,status:0},
    {id:11,status:0},{id:12,status:0},{id:13,status:0},{id:14,status:1},{id:15,status:0},{id:16,status:0},
    {id:17,status:0},{id:18,status:0},{id:19,status:0}
];
const DUMMYDATA_LOWER=[{id:0,status:0},{id:1,status:1},{id:2,status:0},{id:3,status:1},{id:4,status:0},
    {id:5,status:0},{id:6,status:0},{id:7,status:0},{id:8,status:0},{id:9,status:0},{id:10,status:0},
    {id:11,status:0},{id:12,status:0},{id:13,status:0},{id:14,status:0},{id:15,status:0},{id:16,status:0},
    {id:17,status:0},{id:18,status:1},{id:19,status:0},{id:20,status:0},{id:21,status:0},{id:22,status:0},
    {id:23,status:0},{id:24,status:0},{id:25,status:0},{id:26,status:0},{id:27,status:0},{id:28,status:0},
    {id:29,status:0},{id:30,status:0},{id:31,status:1},{id:32,status:1},{id:33,status:0},{id:34,status:0},
    {id:35,status:0},{id:36,status:0},{id:37,status:0},{id:38,status:0},{id:39,status:0}
];

export default function MyCard({NAV,isSeat}){

    const [lowerSeats, setLowerSeats] = useState(DUMMYDATA_LOWER);
    const [upperSeats, setUpperSeats] = useState(DUMMYDATA_UPPER);

    const UPPER_SEAT = [[],[],[],[]];
    upperSeats.map((data,id)=>{
        const comp = (
            <View 
                key={id}
                style={[styles.upperView2,{backgroundColor: data.status == 1 ? secondary : "#9ea5b0"}]} 
            >
            </View>
        );
        const colNumber = id % 4;
        UPPER_SEAT[colNumber].push( comp );
    });
    const Upper=()=>(
        <View style={{marginVertical:20}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginRight:5}}>
                        {UPPER_SEAT[0]}
                    </View>
                    <View>
                        {UPPER_SEAT[1]}
                    </View>
                </View>
                <View style={{alignItems:"center",marginVertical:120,marginHorizontal:5}}>
                    <Text style={{color:"#000",fontSize:12}}>U</Text>
                    <Text style={{color:"#000",fontSize:12}}>P</Text>
                    <Text style={{color:"#000",fontSize:12}}>P</Text>
                    <Text style={{color:"#000",fontSize:12}}>E</Text>
                    <Text style={{color:"#000",fontSize:12}}>R</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginRight:5}}>
                        {UPPER_SEAT[2]}
                    </View>
                    <View>
                        {UPPER_SEAT[3]}
                    </View>
                </View>
            </View>
        </View>
    );

    const LOWER_SEAT = [[],[],[],[]];
    lowerSeats.map((data,id)=>{
        const comp = (
            <View 
                key={id}
                style={[styles.lowerSeat,{backgroundColor: data.status == 1 ? secondary : "#9ea5b0"}]} 
            >
            </View>
        );
        const colNumber = id % 4;
        LOWER_SEAT[colNumber].push( comp );
    });
    const Lower=()=>(
        <View style={{marginVertical:20}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginRight:5}}>
                        {LOWER_SEAT[0]}
                    </View>
                    <View>
                        {LOWER_SEAT[1]}
                    </View>
                </View>
                <View style={{alignItems:"center",marginVertical:120,marginHorizontal:5}}>
                    <Text style={{color:"#000",fontSize:12}}>L</Text>
                    <Text style={{color:"#000",fontSize:12}}>O</Text>
                    <Text style={{color:"#000",fontSize:12}}>W</Text>
                    <Text style={{color:"#000",fontSize:12}}>E</Text>
                    <Text style={{color:"#000",fontSize:12}}>R</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginRight:5}}>
                        {LOWER_SEAT[2]}
                    </View>
                    <View>
                        {LOWER_SEAT[3]}
                    </View>
                </View>
            </View>
        </View>
    );


    return(
        <TouchableOpacity 
            style={styles.card}
            activeOpacity={1}
            onPress={NAV}
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
                        <Text style={{color:"#000",fontSize:12}}> out of 46</Text>
                    </View>
                    <Text style={{color:"#000",fontSize:11}}>13 seats left</Text>
                </View>
            </View>
            {
                isSeat &&
                <>
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            marginTop:15
                        }}
                    >
                        <Lower />
                        <St_Line 
                            height="95%"
                            borderWidth={0.6}
                            borderColor="#aaa"
                            backgroundColor="#aaa"
                            top={-10}
                        />
                        <Upper />
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={0.8}
                        >
                            <Text 
                                style={{
                                    color:"#fff",
                                    letterSpacing:1,
                                    fontWeight:"500"
                                }}
                            >
                                Start Trip
                            </Text>
                        </TouchableOpacity>
                        <View 
                            style={{
                                alignItems:"flex-end",
                                flexDirection:"row",
                                marginVertical:10
                            }}
                        >
                            <Ionicons name="alarm-outline" color="#000" size={20} />
                            <View style={{marginLeft:10,top:-2}}>
                                <Text style={styles.remainderTxt}>Set Remainder</Text>
                                <St_Line 
                                    borderWidth={0.6}
                                    borderColor="#000"
                                    backgroundColor="#000"
                                />
                            </View>
                        </View>
                    </View>
                </>
            }
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
        paddingVertical:8
    },
    remainderTxt: {
        color:"#000",
        letterSpacing:1,
        fontWeight:'500',
        fontSize:11,
        bottom:-2
    }
})