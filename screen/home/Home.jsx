import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, Platform, Alert } from "react-native";
import MenuHomeContainer from '../../components/home/HomeMenuContainer';
import { getAuth } from "firebase/auth";
import { db } from '../../store/services/firebase.services';
import { ref, onValue, off, set, remove  } from "firebase/database";
import { useState } from 'react';
import ImageCircleView from '../../components/circularView/imageCircleView';
import Color from '../../theme/color';
import RNPickerSelect from 'react-native-picker-select';
import CustomModal from '../../components/popup/popup';
import { generateLink, setKitObject } from '../../store/services/link.services';
import { useFocusEffect } from '@react-navigation/native';
import styles from './home_style';


import { login, authStatus } from '../../store/reducers/auth.reducers';
import { useSelector, useDispatch } from 'react-redux'

const pickerStyle = {
    inputIOS: {
        color: 'black',
        paddingTop: 13,
        paddingHorizontal: 40,
        fontSize: 20,
        paddingBottom: 12,
    },

    inputAndroid: {
        fontSize: 20,
        alignSelf: 'center',
        width:160,
        transform : [{ scaleX: 1.1 }, { scaleY: 1.1 }],
        marginTop: "10%",
        marginLeft: "5%",
        alignItems: 'center',
        color: 'white',
    },
    underline: { borderTopWidth: 1 },
};

export default function Home({ route, navigation }) {

    //TEST
    const authSelector = useSelector(authStatus)
    const dispatch = useDispatch()

    dispatch(login({toto : "okok", type: "auth"}))
    //ENDTEST

    const [userName, setUserName] = useState("")
    const [gardeners, setGardeners] = useState([])
    const [currentGardener, setCurrentGardener] = useState("")
    const [isFirst, setIsFirst] = useState(false)
    const [isIrrig, setIsIrrig] = useState(false)
    const [deeplink, setDeeplink] = useState(false)
    const auth = getAuth();

    //console.log(auth.currentUser.uid)

    const setC = (c) => { // le setC redéclenche la function dans le useFocusEffect et donc le onValue
        const userRef2 = ref(db, '/users/' + auth.currentUser.uid + '/currentGardener/')
        set(userRef2, c).then(() => {
            setIsIrrig(gardeners.filter(e => e.id == currentGardener)[0].isIrrig)
        })
    }

    const kitObject = 
    gardeners.filter(e => e.id == currentGardener) // get the current gardener after useFocusEffect apply
        if (kitObject.length > 0) {
            setKitObject(kitObject[0].name, kitObject[0].id)
        }

    useFocusEffect( // first time the screen is loaded, the gardener list is empty, so we need to get the gardener list from firebase
        React.useCallback(() => {
            
            const gardenerRef = ref(db, 'users/' + auth.currentUser.uid + '/gardeners')
            onValue(gardenerRef, (snapshot) => {
                const data = snapshot.val();
                setGardeners([])

                if (data != null) {
                    setIsFirst(false)
                    Object.keys(data).forEach(e => {
                        const temp = ref(db, 'gardeners/' + e);
                        onValue(temp, (snapshot) => {
                            const data = snapshot.val();
                            if (data != null && data.metadata != undefined) {
                                setGardeners(gardeners => [...gardeners, { id: e, name: data.metadata.name, isIrrig: data.irrig }]);
                            }
                            if(Object.keys(data.owners).length == 1) { // fix irrig problem if 1 kit
                                setIsIrrig(data.irrig)
                            }
                        }, {
                            onlyOnce: true
                        });
                        // gardeners.length > 0 ? setCurrentGardener(gardeners[0].id) : setCurrentGardener("")
                    })
                } else {
                    setIsFirst(true)
                }

            }, {
                onlyOnce: true
            });

            const userRef = ref(db, '/users/' + auth.currentUser.uid + '/currentGardener/')
             onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if(data != null){
                    setCurrentGardener(data)
                }  
            })

            const deepLinkRef = ref(db, 'users/' + auth.currentUser.uid + '/link/')
            onValue(deepLinkRef, (snapshot) => {
                const data = snapshot.val();
                if(data != null){
                    switch(data){
                        case "ok":
                            remove(deepLinkRef)
                            setDeeplink(true)
                            break;
                    }
                }  
            })

            return () => {
                off(deepLinkRef)
                off(userRef)
                setDeeplink(false)
                // clear cache stack navigator
               // console.log("unmounted")
            }

        }, []))

    const setCurrentGardenerCb = (id) => {
        return setCurrentGardener(id)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.shadow]}>

                <ImageBackground style={styles.imageBackgroundTop} source={require('../../assets/home/homeBackground.png')}>
                    <View>
                        {deeplink && generateLink.kitId != "" ? <CustomModal props={{
                            navigation: navigation,
                            id: generateLink.kitId,
                            setCurrentGardener: setCurrentGardenerCb
                        }} /> : null}

                        <TouchableHighlight underlayColor="transparent" onPress={() => navigation.push('Profil', { id: auth.currentUser.uid, curr: gardeners.length > 0 && currentGardener == "" ? gardeners[0].id : currentGardener })}>
                            <View style={styles.profilContainer}>
                                <ImageCircleView
                                    imgUrl={require("../../assets/avatar.png")}
                                    size={45}
                                    msg={userName}
                                    flexDirection="row"
                                    id={auth.currentUser.uid} />
                            </View>
                        </TouchableHighlight>
                        {isFirst ? <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: "10%", width: "100%", paddingHorizontal: "4%" }}> Configure ton premier capteur en scannant son QR Code </Text> :
                            gardeners[0] == null ? null : <RNPickerSelect

                                blurOnSubmit ={false}
                                onValueChange={(itemValue) => 
                                    setC(itemValue)
                                }

                                style={{
                                    ...pickerStyle, placeholder: {
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    }
                                }}

                                value={gardeners.length > 0 && currentGardener == "" ? gardeners[0].id : currentGardener}
                                items={gardeners.map((g) => { return { label: g.name, value: g.id } })}
                                placeholder={{}}
                            />}
                    </View>
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => {
                            navigation.push('Scan')
                        }} style={{ width: "10%" }}>
                            <View style={styles.ImageButtonAddCapteur}>
                                <View style={styles.addButton}>
                                    <Text style={styles.buttonText}>+</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>
            </View>

            <MenuHomeContainer nav={navigation} 
            curr={gardeners.length > 0 && currentGardener == "" ? gardeners[0].id : currentGardener}
            isFirst={isFirst && currentGardener != "" || isFirst && currentGardener != null} 
            isIrrigProps={currentGardener != "" ? isIrrig : gardeners.length > 0 ? gardeners[0].isIrrig : false}/>

            <ImageBackground style={styles.imageBackgroundBottom} source={require('../../assets/home/illustration.png')}></ImageBackground>
        </View>
    )
}

