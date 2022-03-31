import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView 
} from 'react-native';
import Background from '../utils/Background';
import { primary } from '../utils/Color';
import Header from '../utils/Header';
import TripCard from '../utils/TripCard';


export default function TodaysTrip({navigation,route}) {

    const preData = route.params;

    return (
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
                    backText="Today's Trip"
                />
                <View style={{width:"100%",top:-20}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:20,paddingBottom:150,paddingTop:10}}
                    >
                        <TripCard 
                            bus_name={preData.name}
                            bus_model={preData.bus_model}
                            total_seat={preData.seats.seater+preData.seats.sleeper}
                            Seater={preData.seats.seater}
                        />
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