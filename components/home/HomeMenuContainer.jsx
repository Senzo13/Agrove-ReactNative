import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, TextInput, Alert, TouchableHighlight } from "react-native";
import Color from "../../theme/color";
import Dimens from "../../theme/dimens";

export default function MenuHomeContainer (props) {
    
    console.log(props)
   useFocusEffect(
        React.useCallback(() => {
            console.log("props => " + props.curr);
        }, [])
    );

    return (
        <View style = { styles.container }>
            <TouchableHighlight underlayColor="transparent" onPress={() => props.isFirst ? null : props.nav.push('Data', {curr : props.curr})}>
            <View style = {[styles.menuAlign , {opacity: props.isFirst ? 0.3 : 1}]}>
                <Image source = { require("../../assets/icons/icone-donnees.png") } style = { styles.icon }/>
                <Text style = { styles.menuText }>Données capteur</Text>
            </View>
            </TouchableHighlight>

            {/* 
            <View style = { styles.menuAlign}>
                <Image source = { require("../../assets/icons/data.png") } style = { styles.icon }/>
                <Text style = { styles.menuText }>Mes plantes</Text>
            </View>
            <View style = { styles.menuAlign}>
                <Image source = { require("../../assets/icons/data.png") } style = { styles.icon }/>
                <Text style = { styles.menuText }>Mes missions</Text>
            </View> */}
            
            <TouchableHighlight underlayColor="transparent" onPress={() =>  props.isFirst ? null : props.nav.push('Team', {curr: props.curr})}>
            <View style = {[styles.menuAlign , {opacity: props.isFirst ? 0.3 : 1}]}>
                <Image source = { require("../../assets/icons/icone-equipe.png") } style = { styles.icon }/>
                <Text style = { styles.menuText }>Mon équipe</Text>
            </View>
             </TouchableHighlight>
            {props.isIrrigProps ?
            <TouchableHighlight underlayColor="transparent" onPress={() =>  props.isFirst ? null : props.nav.push('Irrigation', {curr: props.curr})}>
            <View style = {[styles.menuAlign , {opacity: props.isFirst ? 0.3 : 1}]}>
            <Image source = { require("../../assets/icons/icone-irrig.png") } style = { styles.icon }/>
                <Text style = { styles.menuText }>Irrigation</Text>
            </View>
            </TouchableHighlight> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"45%",
        justifyContent: 'center',
    },
 
    menuAlign: {
        alignSelf: "center",
        width:"70%",
        marginLeft: "20%",
        paddingTop: "5%",
        backgroundColor : "",
        alignItems: 'center',
        flexDirection: "row",
    },

    menuText : {
        paddingLeft : "8%",
        fontSize : Dimens.TITLE_SIZE_BIG,
        color: Color.GREEN_AGROVE,
        fontWeight: "bold",
    },
    icon : {
        width: 30,
        resizeMode : 'contain',
        height: 30,
    }
})