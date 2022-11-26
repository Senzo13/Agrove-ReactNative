import React from "react";
import { View, Text, StyleSheet } from "react-native";


const StateElement = (props) => {
    const { title, value, color, isEditing } = props;

    return(
        <View style={[styles.container, {backgroundColor: isEditing ? color : "#F8F8F8"}]}>
            {/* <View style={[styles.state, {backgroundColor: color}]}> 

            </View> */}
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.textValue, {color: isEditing ? "black" : "black"} ]}>{ value }</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingEnd: 20,
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
    },
    textValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    state:{
        width: 15,
        height: 15,
        borderRadius: 10,
        overflow: "hidden", // borderRadius for specific corner for IOS fix
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10,
    }
})


export default StateElement;