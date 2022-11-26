import { onValue, ref } from "firebase/database";
import { db } from '../../store/services/firebase.services';
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import StateElement from "../../components/element/element";
import GardenerString from "../../values/string/gardenerData/fr/string";
import { capitalizeFirstLetter, convertToCelsius, parseDate, parseTimestamp } from "../../utils/utils";
import Dimens from "../../theme/dimens";
import Color from "../../theme/color";
import { getWeather } from "../../store/services/api/weather";
import Buttonn from "../../components/button/buttonn";
import styles from './gardenerData_style';

const GardenerData = ({ route, navigation }) => {
    const [gardener, setgardener] = useState(null)
    const [temp, setTemp] = useState("")
    const [humidity, setHumidity] = useState("")
    const [pressure, setPressure] = useState("")
    const [dataIsNull, setDataIsNull] = useState(true)


    useEffect(() => {
        const getGardenerInfo = async () => {

            const resp = ref(db, 'gardeners/' + route.params.curr);
            onValue(resp, (snapshot) => {
                const data = snapshot.val();
                setgardener(data)

                // If gardener state is empty, get info by weather api
                if (data.stats == undefined) {
                    setDataIsNull(true)
                    getWeather(data.metadata.zipCode, data.metadata.countryCode).then(res => {
                        setTemp(convertToCelsius(res.main.temp))
                        setHumidity(res.main.humidity)
                        setPressure(res.main.pressure)
                    })
                } else {
                    setDataIsNull(false)
                }

            }, {
                onlyOnce: true // pour éviter tout bug :)
            })
        }

        getGardenerInfo()

    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.name}>{gardener != null ? capitalizeFirstLetter(gardener.metadata.name) : ""}</Text>
            {dataIsNull == false ? <View style={[styles.dateContainer]} >
                <Text>DERNIER RELEVÉ</Text>
                <Text>{gardener != null ? gardener.loraTs == undefined ? "Information non disponible" : parseTimestamp(gardener.loraTs) : ""} </Text>
            </View> : null}



            {gardener != null ?
                <View style={styles.statsContainer}>
                    {dataIsNull == false ? <StateElement title={GardenerString.TV_SOIL_MISTURE + " : "} 
                    value={gardener.stats.capacities.c1 != undefined ? gardener.stats.capacities.c1 + "%": "1%" } 
                    color={gardener.stats.capacities.c1 != undefined ? gardener.stats.capacities.c1 < 50 ? Color.STATS_RED : Color.STATS_GREEN : Color.STATS_GREEN} isEditing={true} /> : null}
                    {/* <Button title="Régler mon seuil d'alerte" color={Color.GREEN_AGROVE} /> */}
                    {dataIsNull == false ? <StateElement title={GardenerString.TV_BATTERY + " : "} value={gardener.stats.battery + "%"} color={gardener.stats.battery < 60 ? Color.STATS_RED : Color.STATS_GREEN} isEditing={true} /> : null}
                    <StateElement title={GardenerString.TV_TEMP + " : "} value={(dataIsNull == false ? gardener.stats.temperature : temp) + "°"} color={Color.STATS_GRAY} isEditing={true} />
                    {dataIsNull == false ? <StateElement title={GardenerString.TV_LUMINOSITY + " : "} value={gardener.stats.luminosity + " Klx"} color={Color.STATS_GRAY} isEditing={false} /> : null}
                    <StateElement title={GardenerString.TV_PRESSURE + " : "} value={(dataIsNull == false ? gardener.stats.pressure : pressure) + "hPa"} color={Color.STATS_GRAY} isEditing={false} />
                    <StateElement title={GardenerString.TV_AIR_HUMIDITY + " : "} value={(dataIsNull == false ? gardener.stats.humidity : humidity) + "%"} color={Color.STATS_GRAY} isEditing={false} />
                    <View style={{marginBottom : 25}}></View>
                    <Buttonn title={"Configurer mes alertes d’arrosage"} onPress={() => navigation.push('IrrigationParam', { curr: route.params.curr })} />
                    <View style={{marginBottom : 25}}></View>
                </View>
                : null}
        </ScrollView>
    )
}



export default GardenerData;