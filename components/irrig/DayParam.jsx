import { useFocusEffect } from "@react-navigation/native"
import React, { useState } from "react"
import { useEffect } from "react"
import { View, StyleSheet, Text, TextInput, TouchableHighlight, Alert, ListViewComponent, Image } from "react-native"
import Color from "../../theme/color"


const DayParam = ({submit, saved}) => {
    const [config, setConfig] = useState([])

    const [hour, sethour] = useState("")
    const [min, setMin] = useState("")

    useEffect(() => {

        console.log("saved =>>> ", saved)
        if(saved != null){
            const temp = [...saved]
            setConfig(temp)
            submit("all", temp)
            }
    }, [saved])
    
    
    

    const addToConfig = () => {
        //parse hour and min to int
        const hourInt = parseInt(hour)
        const minInt = parseInt(min)
        console.log(hourInt)
        if(hourInt > 24 || hourInt < 0 || !hourInt){
            Alert.alert("Erreur", "L'heure doit être comprise entre 0 et 24")
        }else if(minInt > 60 || minInt < 0 || !minInt){
            Alert.alert("Erreur", "Les minutes doivent être comprises entre 0 et 60")
        }else{
            const obj = {h : hourInt, m : minInt}
            const temp = [...config, obj]
            setConfig(temp)
            submit("all", temp)
            setMin("")
            sethour("")
        
        }
    }

    const removeToConfig = (index) => {
        const temp = [...config]
        temp.splice(index, 1)
        setConfig(temp)
        submit("all", temp)
    }

    return(
        <View style={style.container}>

            <View style={style.addContainer}>
                <Text>À </Text>
                <TextInput style={style.input} keyboardType="numbers-and-punctuation" placeholder="00" value={hour} onChangeText={t => sethour(t)}/>
                <Text style={{fontWeight:"bold"}}> h </Text>
                <Text> Pendant </Text>
                <TextInput style={style.input} keyboardType="numbers-and-punctuation" placeholder="00" value={min} onChangeText={t => setMin(t)}/>
                <Text style={{fontWeight:"bold"}}> min </Text>
            </View>

            <TouchableHighlight style={style.press} onPress={addToConfig}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Image source={require("../../assets/PlusCircle.png")} />
                <Text style={style.addText}>Ajouter un horaire</Text>
            </View>
            </TouchableHighlight>

            {config.map((item, index) => 
            <View key={index} style={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{display: "flex", flexDirection: "row"}}>
                <Text>À </Text>
                <Text style={{fontWeight: "600"}} >{item.h}h </Text>
                <Text>pendant </Text>
                <Text style={{fontWeight: "600"}}>{item.m}m</Text>
                </View>
                <Text onPress={() => removeToConfig(index)} style={{color: "#F68866", fontWeight: "600"}}>Supprimer</Text>
            </View>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        width: "100%",
        paddingStart: 10,
    },
    addContainer : {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        width: "20%",
        color: "black",
        marginTop: 5,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        borderColor: "#D9D9D9",
    },
    addText : {
        color: "white",
        margin: 10,
    },
    press : {
        backgroundColor: Color.GREEN_AGROVE,
        width: "60%",
        marginVertical: 22,
        borderRadius: 64,
    }
})
export default DayParam