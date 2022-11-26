import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from "react-native";

const ButtonComponent = (props) => {
    return (
        <View>
            <Text style={[styles.textInput , { backgroundColor: props.name.color }]}> { props.name.text } </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        fontWeight: '600',
        padding: 10,
        fontSize: 18,
        margin: 10,
        marginTop: 0,
        width: 220,
        color: 'white',
        borderRadius: 5,
        textTransform: 'uppercase'
    }
})

export default ButtonComponent;