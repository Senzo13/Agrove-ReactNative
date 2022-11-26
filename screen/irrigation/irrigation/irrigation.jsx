import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Switch, Modal, ScrollView, Alert, TouchableHighlight, Image } from "react-native";
import Buttonn from "../../../components/button/buttonn";
import Color from "../../../theme/color";
import Dimens from "../../../theme/dimens";
import IrrigationString from "../../../values/string/irrigation/string";
import Slider from '@react-native-community/slider';
import DayParam from "../../../components/irrig/DayParam";
import WeekParam from "../../../components/irrig/WeekParam";
import { convertDateToPayload, testMet } from "../../../utils/utils";
import irrigCalendarPayload from "../../../irrigPayload";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { db } from '../../../store/services/firebase.services';
import { getDatabase, ref, onValue, off, push, set } from "firebase/database";
import styles from './irrigation_style';

const Irrigation = ({ route, navigation }) => {
    const [hour, setHour] = useState(-1)
    const [irrig, setirrig] = useState(25)

    const [isSmart, setIsSmart] = useState(false)
    const [isProg, setIsProg] = useState(false)

    const [isByDay, setIsByDay] = useState(false)
    const [isByWeek, setIsByWeek] = useState(false)

    const [config, setConfig] = useState(null)

    // liste des configurations
    const [mondayCf, setMondayCf] = useState([])
    const [tuesdayCf, setTuesdayCf] = useState([])
    const [wednesdayCf, setWednesdayCf] = useState([])
    const [thursdayCf, setThursdayCf] = useState([])
    const [fridayCf, setFridayCf] = useState([])
    const [saturdayCf, setSaturdayCf] = useState([])
    const [sundayCf, setSundayCf] = useState([])

    const [allDayCf, setAllDayCf] = useState([])

    const [saved, setSaved] = useState({})


    const setOldConfig = (config, type) => {
        setSaved(config)
        if (type == "isByWeek") {
            if(config.l != null){
                var temp = []
                temp.push(...config.l)
                setMondayCf(temp)
            }
            if(config.m != null){
                var temp = []
                temp.push(...config.m)
                console.log("horaire : " + temp)
                setTuesdayCf(temp)
            }
            if(config.mc != null){
                var temp = []
                temp.push(...config.mc)
                setWednesdayCf(temp)
            }
            if(config.j != null){
                var temp = []
                temp.push(...config.j)
                setThursdayCf(temp)
            }
            if(config.v != null){
                var temp = []
                temp.push(...config.v)
                setFridayCf(temp)
            }
            if(config.s != null){
                var temp = []
                temp.push(...config.s)
                setSaturdayCf(temp)
            }
            if(config.d != null){
                var temp = []
                temp.push(...config.d)
                setSundayCf(temp)
            }
        }

    }
    useFocusEffect(
        React.useCallback(() => {
            const configInfo = ref(db, 'gardeners/' + route.params.curr + '/config');
            onValue(configInfo, (snapshot) => {
                const data = snapshot.val()
                if (data != null && route.params.curr != "") {
                    setType(data.type)
                    setOldConfig(data.config, data.type)
                    if (data.type == "isSmart") {
                        setirrig(data.config.irrig)
                    }
                }
            }
            )
            // setType("isByWeek")
            // setSaved({l : [{h: 13, m: 20}], m : [{h: 33, m: 30}]})
            return () => {
                off(configInfo)
            }
        }, [])
    )

    const setSaveConfig = () => {
        var typeString = ""

        if (isSmart) {
            typeString = "isSmart"
        } else if (isByDay) {
            typeString = "isByDay"
        } else if (isByWeek) {
            typeString = "isByWeek"
        }
        console.log("on lance =>  " + mondayCf)
        set(ref(db, 'gardeners/' + route.params.curr + '/config'), {
            type: typeString,
            config: {
                l: mondayCf == undefined ? [] : mondayCf,
                m: tuesdayCf == undefined ? [] : tuesdayCf,
                mc: wednesdayCf == undefined ? [] : wednesdayCf,
                j: thursdayCf == undefined ? [] : thursdayCf,
                v: fridayCf == undefined ? [] : fridayCf,
                s: saturdayCf == undefined ? [] : saturdayCf,
                d: sundayCf == undefined ? [] : sundayCf,
                all: allDayCf == undefined ? [] : allDayCf,
                irrig: irrig
            }
        }).then((snapshot) => {
            Alert.alert("Paramètres sauvegardés")
        }).catch((error) => {
            Alert.alert("Erreur lors de la sauvegarde : " + error)
        }
        )
        sendData()
    }
    const setType = (type) => {
        console.log(type)
        if (type == "isSmart") {
            setIsSmart(true)
            setIsProg(false)
        } else if (type == "isByDay" || type == "isByWeek") {
            setIsSmart(false)
            setIsProg(true)
            if (type == "isByDay") {
                setIsByDay(true)
                setIsByWeek(false)
            }
            if (type == "isByWeek") {
                setIsByDay(false)
                setIsByWeek(true)
            }
        }
    }


    const toggleSwitch = (name) => {
        if (name == "smart") {
            const toto = previousState => !previousState
            setIsSmart(toto)
            if (toto) {
                setIsProg(false)
            }
        }

        if (name == "prog") {
            const toto = previousState => !previousState
            setIsProg(toto)
            if (toto) {
                setIsSmart(false)
            }
        }

    };

    const toggleProgSwitch = (name) => {
        if (name == "day") {
            const toto = previousState => !previousState
            setIsByDay(toto)
            if (toto) {
                setIsByWeek(false)
            }
        }

        if (name == "week") {
            const toto = previousState => !previousState
            setIsByWeek(toto)
            if (toto) {
                setIsByDay(false)
            }
        }

    };

    const submit = (type, data) => {
        var temp = []
        switch (type) {
            case "l":
                console.log("l")
                if (data != null) {
                    if (data.length > 0) {
                        temp.push(...data)
                        setMondayCf(temp)
                    } else {
                        setMondayCf([])
                    }
                } else {
                    setMondayCf([])
                }
                break;
            case "m":
                if (data != null) {
                    temp.push(...data)
                }
                setTuesdayCf(temp)
                break;
            case "mc":
                if (data != null) {
                    temp.push(...data)
                }
                setWednesdayCf(temp)
                break;
            case "j":
                if (data != null) {
                    temp.push(...data)
                }
                setThursdayCf(temp)
                break;
            case "v":
                if (data != null) {
                    temp.push(...data)
                }
                setFridayCf(temp)
                break;
            case "s":
                if (data != null) {
                    temp.push(...data)
                }
                setSaturdayCf(temp)
                break;
            case "d":
                if (data != null) {
                    temp.push(...data)
                }
                setSundayCf(temp)
                break;
            case "all":
                temp.push(...data)
                setAllDayCf(temp)
                console.log(allDayCf)
                break;
            default:
                break;
        }


    }

    const sendData = () => {
        const durationarr = []
        const datearr = []

        if (isSmart) {

        } else if (isProg) {
            if (!isByDay && !isByWeek) {
                Alert.alert("Erreur", "veuillez remplir les configurationsss")
            } else {
                if (isByWeek) {
                    if (mondayCf.length > 0) {
                        datearr.push(...convertDateToPayload("l", mondayCf)[0])
                        durationarr.push(...convertDateToPayload("l", mondayCf)[1])
                    }
                    if (tuesdayCf.length > 0) {
                        datearr.push(...convertDateToPayload("m", tuesdayCf)[0])
                        durationarr.push(...convertDateToPayload("m", tuesdayCf)[1])
                    }
                    if (wednesdayCf.length > 0) {
                        datearr.push(...convertDateToPayload("mc", wednesdayCf)[0])
                        durationarr.push(...convertDateToPayload("mc", wednesdayCf)[1])
                    }
                    if (thursdayCf.length > 0) {
                        datearr.push(...convertDateToPayload("j", thursdayCf)[0])
                        durationarr.push(...convertDateToPayload("j", thursdayCf)[1])
                    }
                    if (fridayCf.length > 0) {
                        datearr.push(...convertDateToPayload("v", fridayCf)[0])
                        durationarr.push(...convertDateToPayload("v", fridayCf)[1])
                    }
                    if (saturdayCf.length > 0) {
                        datearr.push(...convertDateToPayload("s", saturdayCf)[0])
                        durationarr.push(...convertDateToPayload("s", saturdayCf)[1])
                    }
                    if (sundayCf.length > 0) {
                        datearr.push(...convertDateToPayload("d", sundayCf)[0])
                        durationarr.push(...convertDateToPayload("d", sundayCf)[1])
                    }
                } else if (isByDay) {
                    if (allDayCf.length > 0) {
                        datearr.push(...convertDateToPayload("all", allDayCf)[0])
                        durationarr.push(...convertDateToPayload("all", allDayCf)[1])
                    }
                } else {
                    Alert.alert("Erreur", "veuillez remplir les configurations")
                }
            }
        } else {
            Alert.alert("Erreur", "veuillez remplir les configurations")
        }

        if (datearr.length > 0 && durationarr.length > 0) {
            irrigCalendarPayload(datearr, durationarr, route.params.curr)
        } else {
            if (!isSmart) {
                Alert.alert("Erreur", "veuillez remplir les configurations")
            }
        }
    }

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.padd}>
                    <View style={styles.componentContainer}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <Text style={styles.componentContainerTitle}>{IrrigationString.SMART_IRRIG}</Text>
                            <Switch value={isSmart} onChange={() => toggleSwitch("smart")} />
                        </View>
                        {isSmart ? <View style={{ width: "100%", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, width: "100%", marginVertical: 12 }}>Seuil d’huminidité à partir duquel l’irrigation se déclenche</Text>
                            <Text>{irrig}%</Text>
                            <Slider
                                style={{ width: "90%", height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#D9D9D9"
                                maximumTrackTintColor="#D9D9D9"
                                thumbTintColor={Color.GREEN_AGROVE}
                                value={irrig}
                                onValueChange={(value) => setirrig(value)}
                                step={1}
                            />
                        </View> : null}

                    </View>
                    <Text style={styles.descStyle}>{IrrigationString.DESC_IRRIG}</Text>
                    <View style={styles.line} />
                    <View style={styles.componentContainer}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <Text style={styles.componentContainerTitle} >{IrrigationString.PROGRAMER}</Text>
                            <Switch value={isProg} onChange={() => toggleSwitch("prog")} />
                        </View>
                    </View>
                    {isProg ? <View>
                        <View style={styles.calendarComponentContainer}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", }}>
                                <Text style={styles.componentContainerTitle} >{IrrigationString.WATERALLDAY}</Text>
                                <Switch value={isByDay} onChange={() => toggleProgSwitch("day")} />
                            </View>
                            {isByDay ? <DayParam submit={submit} saved={saved != undefined && saved.all != undefined && isByDay ? saved.all : null} /> : null}
                            <View>
                                <View style={styles.durring}>
                                </View>
                            </View>
                        </View>
                        <View style={styles.calendarComponentContainer}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", }}>
                                <Text style={styles.componentContainerTitle} >{IrrigationString.CONFIGURE}</Text>
                                <Switch value={isByWeek} onChange={() => toggleProgSwitch("week")} />
                            </View>
                            {isByWeek ? <View>
                                <WeekParam submit={submit} day="Lundi" saved={saved != undefined && isByWeek ? saved.l : null} />
                                <WeekParam submit={submit} day="Mardi" saved={saved != undefined && isByWeek ? saved.m : null} />
                                <WeekParam submit={submit} day="Mercredi" saved={saved != undefined && isByWeek ? saved.mc : null} />
                                <WeekParam submit={submit} day="Jeudi" saved={saved != undefined && isByWeek ? saved.j : null} />
                                <WeekParam submit={submit} day="Vendredi" saved={saved != undefined && isByWeek ? saved.v : null} />
                                <WeekParam submit={submit} day="Samedi" saved={saved != undefined && isByWeek ? saved.s : null} />
                                <WeekParam submit={submit} day="Dimanche" saved={saved != undefined && isByWeek ? saved.d : null} />
                            </View> : null}
                        </View>
                    </View> : null}
                    <View style={styles.line} />
                    {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", marginBottom: "10%" }}>
                        <Text style={{ fontWeight: 'bold', marginVertical: 10, marginTop: 30 }}>{IrrigationString.TEST}</Text>
                        <Text style={{ marginVertical: 20 }}>{IrrigationString.OPEN}</Text>
                        <Buttonn title={IrrigationString.SEND} />

                    </View> */}
                </View>
            </ScrollView>
            <View style={styles.viewValid}>
                <TouchableHighlight underlayColor="transparent" onPress={() => setSaveConfig()} style={[styles.clickZone]}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../../../assets/CheckCircle.png')} />
                        <Text style={styles.clickText}> Valider les modifications </Text>
                    </View>
                </TouchableHighlight>

            </View>
        </View>

    )
}


export default Irrigation;