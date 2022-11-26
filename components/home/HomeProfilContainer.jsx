import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, TextInput, Alert } from "react-native";
import ImageCircleView from '../circularView/imageCircleView';
import Color from '../../theme/color';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../store/services/firebase.services';
import { onValue, ref } from 'firebase/database';


const ProfilHomeContainer = ({ name, gardeners}) => {
    const [gardener, setgardener] = useState("")
    const [gardenersObject, setGardenersObject] = useState([])

    useEffect(()  => {
        
        // get all gardeners from firebase and store id and name in an array
        const getGardenerName = async () => {
            var tempArray= []
            await gardeners.forEach(e => {
                const temp = ref(db, 'gardeners/' + e);
                onValue(temp, (snapshot) => {
                    const data = snapshot.val();
                    tempArray.push({id : e, name : data.metadata.name})
                    
                })     
            setGardenersObject(tempArray)
            })
        }
        getGardenerName()
    }, [])
    return (
        <View style={[styles.header, styles.shadow]}>

            <ImageBackground style={styles.imageBackgroundTop} source={require('../../assets/home/homeBackground.png')}>

                <View style={styles.profilContainer}>
                    <ImageCircleView
                        imgUrl={require("../../assets/avatar.png")}
                        size={45}
                        msg={name}
                        flexDirection="row" />
                </View>

                <Picker selectedValue={gardener}
                    onValueChange={(itemValue, itemIndex) =>
                        setgardener(itemValue)
                    }>
                    {gardenersObject.map((g) => { return <Picker.Item key={g} label={g.name} value={g.id} /> })}
                </Picker>

                <View style={styles.ImageButtonAddCapteur}>
                    <View style={styles.addButton}>
                        <Text style={styles.buttonText}>+</Text>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({

    addButton: {
        width: 45,
        height: 40,
        backgroundColor: "white",
        borderTopStartRadius: 40,
        borderColor: "grey",
    },

    ImageButtonAddCapteur: {
        width: "100%",
        resizeMode: "contain",
        position: "absolute",
        bottom: 0,
        alignItems: 'flex-end',
    },

    buttonText: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "25%",
        color: Color.GREEN_AGROVE,
        fontSize: 25,
        fontWeight: "300",
    },

    profilContainer: {
        width: "100%",
        paddingTop: "5%",
    },

    header: {
        width: "100%",
        height: "35%",
    },

    shadow: {
        borderColor: 'black',
        shadowColor: 'black',
        elevation: 8,
        shadowOffset: { width: 40, height: 40 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 7,
    },

    imageBackgroundTop: {
        width: "100%",
        height: "100%",
    },
})

export default ProfilHomeContainer;
