import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableHighlight, Image} from "react-native"
import Checkbox from 'expo-checkbox';
import Color from "../../theme/color";
import DayParam from "./DayParam";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";


const WeekParam = ({day, submit, saved}) => {
    //CHECKBOX
    const [isCheck, setIsCheck] = useState(false)

    //SLIDER
    const [isActive, setIsActive] = useState(false)

    const [memory, setMemory] = useState([])
    const [letter, setLetter] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            parseLetter(true)
        }, [saved])
    );
    
    

    const updateDate = (type, data) => {
        setMemory(data)

        if(isCheck){
            submit(letter, data)
        }else{
            submit(letter, [])
        }
    }

    const handleCheckbox = () => {
        console.log("toto")
        setIsCheck(!isCheck)
        if(!isCheck){
            submit(letter, memory)
        }else{
            console.log("vide")
            submit(letter, [])
        }
    }
    

    const parseLetter = (isStart) => {
        if(isStart){
            setMemory(saved == null ? null : saved)
            setIsCheck(saved != null)
            console.log('saved jour' + day, saved)


        }
        switch (day) {
            case "Lundi":
                setLetter("l")
                break;
            case "Mardi":
                setLetter("m")
                break;
            case "Mercredi":
                setLetter("mc")
                break;
            case "Jeudi":
                setLetter("j")
                break;
            case "Vendredi":
                setLetter("v")
                break;
            case "Samedi":
                setLetter("s")
                break;
            case "Dimanche":
                setLetter("d")
                break;
            default:
                break;
        }
    }


    return (
        <View>

            <View style={styles.global}>
            <View style={styles.dayContainer}>
                <View style={styles.day}>
                    <Checkbox color={Color.GREEN_AGROVE} style={styles.checkbox} value={isCheck} onValueChange={handleCheckbox} />
                    <Text>{day} </Text>
                </View>
                <TouchableHighlight underlayColor="transparent" style={styles.touch} onPress={() => setIsActive(!isActive)}>
                    {isActive ? <Image source={require('../../assets/Carettop.png')} style={styles.arrow} /> : <Image source={require('../../assets/Caretbottom.png')} style={styles.arrow} />}
                
                </TouchableHighlight>
            </View>
            {/* <DayParam submit={updateDate} saved={saved}/> */}
            {isActive && <DayParam submit={updateDate} saved={saved}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
    },
    checkbox: {
        margin: 8,
        width: 30,
        height: 30,
    },
    dayContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    day: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    touch: {
        width: "10%",
        alignItems: "center",
        margin: 10,
    },
    global: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        marginVertical: 8,
        borderRadius: 8,
    }
})

export default WeekParam